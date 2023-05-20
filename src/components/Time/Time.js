import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export const Time = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker localeText={{ start: 'Start', end: 'End' }} />
        </LocalizationProvider>
    );
}
