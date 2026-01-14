import React, { useState } from 'react';
import { 
  format,
  addMonths,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
} from 'date-fns';
import fr from 'date-fns/locale/fr';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  bookedDates?: string[];
}

export default function Calendar({ selectedDate, onSelectDate, bookedDates = [] }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const onNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const onPrevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  
  // Calculate start of month manually to avoid import errors
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = endOfMonth(monthStart);
  
  // Calculate start of week (Monday start for 'fr') manually
  const startDay = monthStart.getDay(); // 0 is Sunday
  const diffToMonday = (startDay + 6) % 7;
  const startDate = new Date(monthStart);
  startDate.setDate(monthStart.getDate() - diffToMonday);

  const endDate = endOfWeek(monthEnd, { locale: fr });
  
  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });
  
  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  // Calculate today at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-white p-6 border border-[#d4b896]/30 rounded-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-[#2d4a3e] capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: fr })}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onPrevMonth} className="h-9 w-9 border-[#d4b896]/50 text-[#2d4a3e] hover:bg-[#d4b896]/10">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onNextMonth} className="h-9 w-9 border-[#d4b896]/50 text-[#2d4a3e] hover:bg-[#d4b896]/10">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 mb-4">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-[#2d4a3e]/60 py-2 uppercase tracking-wide">
            {d}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((dayItem, i) => {
          const isSelected = selectedDate && isSameDay(dayItem, selectedDate);
          const isCurrentMonth = isSameMonth(dayItem, monthStart);
          const isPast = isBefore(dayItem, today);
          const isSunday = dayItem.getDay() === 0;
          const isDisabled = !isCurrentMonth || isPast || isSunday;
          
          return (
            <div key={i} className="aspect-square">
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => onSelectDate(dayItem)}
                className={cn(
                  "w-full h-full flex items-center justify-center text-sm rounded-sm transition-all font-medium",
                  // Base text color
                  "text-[#2d4a3e]",
                  // Visibility
                  !isCurrentMonth && "invisible",
                  // Selected state (overrides text color)
                  isSelected && "bg-[#2d4a3e] text-white hover:bg-[#2d4a3e]",
                  // Current month interaction
                  isCurrentMonth && !isDisabled && !isSelected && "hover:bg-[#d4b896]/20",
                  // Today highlight
                  isToday(dayItem) && !isSelected && "border border-[#d4b896]",
                  // Disabled state (overrides text color)
                  isDisabled && "opacity-40 cursor-not-allowed hover:bg-transparent text-gray-400"
                )}
              >
                {format(dayItem, 'd')}
              </button>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex items-center gap-6 text-xs text-[#2d4a3e]/70 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#2d4a3e] rounded-sm"></div>
          <span>Sélectionné</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-[#d4b896] rounded-sm"></div>
          <span>Aujourd'hui</span>
        </div>
      </div>
    </div>
  );
}