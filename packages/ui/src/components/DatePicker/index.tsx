import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Typography,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { styles } from './index.style';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const POPUP_HEIGHT = 420; // approximate max height of the calendar popup

interface DatePickerProps {
  label?: string;
  value?: string; // "YYYY-MM-DD"
  onChange: (date: string) => void;
  placeholder?: string;
  required?: boolean;
  maxDate?: Date;
  minDate?: Date;
  error?: boolean;
  helperText?: string;
  name?: string;
}

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = 'DD/MM/YYYY',
  required,
  maxDate,
  minDate,
  error,
  helperText,
  name = 'datePicker',
}: DatePickerProps) {
  const today = new Date();
  const initialDate = value ? new Date(value) : null;

  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(
    initialDate?.getMonth() ?? today.getMonth()
  );
  const [viewYear, setViewYear] = useState(
    initialDate?.getFullYear() ?? today.getFullYear()
  );
  const [tempDate, setTempDate] = useState<{
    d: number;
    m: number;
    y: number;
  } | null>(
    initialDate
      ? {
          d: initialDate.getDate(),
          m: initialDate.getMonth(),
          y: initialDate.getFullYear(),
        }
      : null
  );
  const [popupPos, setPopupPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  // Calculate popup position relative to viewport
  const updatePopupPos = useCallback(() => {
    if (!inputWrapperRef.current) return;
    const rect = inputWrapperRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top: number;
    if (spaceBelow >= POPUP_HEIGHT + 8) {
      top = rect.bottom + 6;
    } else if (spaceAbove >= POPUP_HEIGHT + 8) {
      top = rect.top - POPUP_HEIGHT - 6;
    } else {
      // Default to below
      top = rect.bottom + 6;
    }

    setPopupPos({ top, left: rect.left });
  }, []);

  // Close on outside click — commit tempDate value if one is selected
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        // Commit the currently selected date before closing (same as Confirm)
        if (tempDate) {
          const iso = `${tempDate.y}-${pad(tempDate.m + 1)}-${pad(tempDate.d)}`;
          onChange(iso);
        }
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, tempDate, onChange]);

  // Recalculate position on scroll/resize while open
  useEffect(() => {
    if (!open) return;
    updatePopupPos();
    const handleReposition = () => updatePopupPos();
    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);
    return () => {
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [open, updatePopupPos]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const prevDays = new Date(viewYear, viewMonth, 0).getDate();
  const pad = (n: number) => String(n).padStart(2, '0');

  const displayValue = tempDate
    ? `${pad(tempDate.d)}/${pad(tempDate.m + 1)}/${tempDate.y}`
    : '';

  function handleConfirm() {
    if (!tempDate) return;
    const iso = `${tempDate.y}-${pad(tempDate.m + 1)}-${pad(tempDate.d)}`;
    onChange(iso);
    setOpen(false);
  }

  const startYear = maxDate ? maxDate.getFullYear() : today.getFullYear();
  const endYear = minDate ? minDate.getFullYear() : 1940;

  return (
    <FormControl
      fullWidth
      required={required}
      size="small"
      ref={rootRef}
      sx={styles.root}
    >
      {label && (
        <FormLabel sx={styles.label} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <OutlinedInput
        ref={inputWrapperRef}
        fullWidth
        id={name}
        name={name}
        readOnly
        value={displayValue}
        placeholder={placeholder}
        error={error}
        onClick={() => setOpen((v) => !v)}
        sx={{ cursor: 'pointer', '& input': { cursor: 'pointer' } }}
        endAdornment={
          <InputAdornment position="end">
            <CalendarMonthIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          </InputAdornment>
        }
      />
      {open && (
        <Box
          sx={styles.popupPortal}
          style={{ top: popupPos.top, left: popupPos.left }}
        >
          <Box sx={styles.topSection}>
            <Box sx={styles.topSectionLeft}>
              <Box sx={styles.popupTitle}>Select Date</Box>
              <Box sx={styles.selects}>
                <Box
                  component="select"
                  sx={styles.select}
                  value={viewMonth}
                  onChange={(e) => {
                    const newMonth = +e.target.value;
                    setViewMonth(newMonth);
                    if (tempDate) {
                      // Clamp day if new month has fewer days
                      const maxDay = new Date(
                        viewYear,
                        newMonth + 1,
                        0
                      ).getDate();
                      setTempDate({
                        ...tempDate,
                        m: newMonth,
                        d: Math.min(tempDate.d, maxDay),
                      });
                    }
                  }}
                >
                  {MONTHS.map((m, i) => (
                    <option key={i} value={i}>
                      {m}
                    </option>
                  ))}
                </Box>
                <Box
                  component="select"
                  sx={styles.select}
                  value={viewYear}
                  onChange={(e) => {
                    const newYear = +e.target.value;
                    setViewYear(newYear);
                    if (tempDate) {
                      // Clamp day if new year/month combo has fewer days (e.g. leap year Feb)
                      const maxDay = new Date(
                        newYear,
                        viewMonth + 1,
                        0
                      ).getDate();
                      setTempDate({
                        ...tempDate,
                        y: newYear,
                        d: Math.min(tempDate.d, maxDay),
                      });
                    }
                  }}
                >
                  {Array.from(
                    { length: startYear - endYear + 1 },
                    (_, i) => startYear - i
                  ).map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box sx={styles.calendarIcon}>
              <Box sx={[styles.calendarRing, styles.ringLeft]} />
              <Box sx={[styles.calendarRing, styles.ringRight]} />
              <Box component="span" sx={styles.iconText}>
                {tempDate ? pad(tempDate.d) : '--'}
              </Box>
            </Box>
          </Box>
          {/* Day headers */}
          <Box sx={styles.gridHead}>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(
              (d, index) => (
                <Box
                  key={d}
                  component="span"
                  sx={[styles.gridHeadSpan, index === 0 && styles.gridHeadSun]}
                >
                  {d}
                </Box>
              )
            )}
          </Box>
          {/* Grid */}
          <Box sx={styles.grid}>
            {/* Prev month ghost days */}
            {Array.from({ length: firstDay }, (_, i) => (
              <Box key={`p${i}`} sx={[styles.cell, styles.empty]}>
                {prevDays - firstDay + 1 + i}
              </Box>
            ))}
            {/* Current month days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const d = i + 1;
              const dow = new Date(viewYear, viewMonth, d).getDay();
              const isToday =
                d === today.getDate() &&
                viewMonth === today.getMonth() &&
                viewYear === today.getFullYear();
              const isSelected =
                tempDate &&
                d === tempDate.d &&
                viewMonth === tempDate.m &&
                viewYear === tempDate.y;
              const isSunday = dow === 0;
              return (
                <Box
                  key={d}
                  sx={[
                    styles.cell,
                    isSelected && styles.selected,
                    isToday && !isSelected && styles.today,
                    isSunday && !isSelected && !isToday && styles.sunday,
                  ]}
                  onClick={() => {
                    // Only update internal selection — keep popup open.
                    // Value is committed when user clicks Confirm or clicks outside.
                    setTempDate({ d, m: viewMonth, y: viewYear });
                  }}
                >
                  {pad(d)}
                </Box>
              );
            })}
            {/* Next month ghost days */}
            {Array.from(
              {
                length:
                  (firstDay + daysInMonth) % 7 === 0
                    ? 0
                    : 7 - ((firstDay + daysInMonth) % 7),
              },
              (_, i) => (
                <Box key={`n${i}`} sx={[styles.cell, styles.empty]}>
                  {pad(i + 1)}
                </Box>
              )
            )}
          </Box>
          <Box component="button" sx={styles.confirm} onClick={handleConfirm}>
            Confirm
          </Box>
        </Box>
      )}
      {error && helperText && (
        <FormHelperText sx={styles.formHelperTextStyle} error>
          <ErrorOutlineIcon sx={{ fontSize: 16 }} />
          <Typography component="span" variant="subtitle2">
            {helperText}
          </Typography>
        </FormHelperText>
      )}
    </FormControl>
  );
}
