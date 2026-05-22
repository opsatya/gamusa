#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy.sh — Build and deploy lektus-app to S3 + invalidate CloudFront
#
# Usage:
#   ./deploy.sh                  # deploy all apps
#   ./deploy.sh recruitment      # deploy only recruitment
#   ./deploy.sh admin            # deploy only admin
#   ./deploy.sh candidate        # deploy only candidate
# ─────────────────────────────────────────────────────────────────────────────
set -e

AWS_PROFILE="nexusintra"
AWS_REGION="ap-south-1"

# S3 bucket names
BUCKET_RECRUITMENT="nexusintra-recruitment"
BUCKET_ADMIN="nexusintra-admin"
BUCKET_CANDIDATE="nexusintra-candidate"

# CloudFront distribution IDs — fill in after creating distributions
CF_RECRUITMENT="E2JAYD5YQ7QET4"
CF_ADMIN="E216ACNGWTJSSU"
CF_CANDIDATE="E3GH11EX9R37EO"

APPS_DIR="$(cd "$(dirname "$0")/apps" && pwd)"

log() { echo "[$(date '+%H:%M:%S')] $*"; }
die() { echo "[ERROR] $*" >&2; exit 1; }

command -v aws &>/dev/null    || die "AWS CLI not installed."
command -v pnpm &>/dev/null   || die "pnpm not installed."

deploy_app() {
  local APP=$1
  local BUCKET=$2
  local CF_ID=$3

  log "[$APP] Building..."
  cd "$APPS_DIR/$APP"
  pnpm install --frozen-lockfile
  pnpm build:prod

  log "[$APP] Syncing to s3://$BUCKET..."
  aws s3 sync dist/ "s3://$BUCKET" \
    --delete \
    --profile "$AWS_PROFILE" \
    --region "$AWS_REGION" \
    --cache-control "public,max-age=31536000,immutable" \
    --exclude "index.html"

  # index.html should not be cached
  aws s3 cp dist/index.html "s3://$BUCKET/index.html" \
    --profile "$AWS_PROFILE" \
    --region "$AWS_REGION" \
    --cache-control "no-cache,no-store,must-revalidate" \
    --content-type "text/html"

  if [ "$CF_ID" != "CHANGE_ME_"* ]; then
    log "[$APP] Invalidating CloudFront ($CF_ID)..."
    aws cloudfront create-invalidation \
      --distribution-id "$CF_ID" \
      --paths "/*" \
      --profile "$AWS_PROFILE"
  else
    log "[$APP] Skipping CloudFront invalidation (CF ID not set)"
  fi

  log "[$APP] Done."
}

TARGET=${1:-all}

case $TARGET in
  recruitment) deploy_app "recruitment" "$BUCKET_RECRUITMENT" "$CF_RECRUITMENT" ;;
  admin)       deploy_app "admin"       "$BUCKET_ADMIN"       "$CF_ADMIN"       ;;
  candidate)   deploy_app "candidate"   "$BUCKET_CANDIDATE"   "$CF_CANDIDATE"   ;;
  all)
    deploy_app "recruitment" "$BUCKET_RECRUITMENT" "$CF_RECRUITMENT"
    deploy_app "admin"       "$BUCKET_ADMIN"       "$CF_ADMIN"
    deploy_app "candidate"   "$BUCKET_CANDIDATE"   "$CF_CANDIDATE"
    ;;
  *) die "Unknown app '$TARGET'. Use: recruitment | admin | candidate | all" ;;
esac

log "Deployment complete!"
