import React from 'react';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TimeSlotPickerProps {
  selectedDate: Date | null;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  bookedSlots?: string[];
}

export default function TimeSlotPicker({ selectedDate, selectedTime, onSelectTime, bookedSlots = [] }: TimeSlotPickerProps) {
  if (!selectedDate) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-100 rounded-sm text-center">
        <Clock className="h-10 w-10 text-gray-300 mb-4" />
        <p className="text-gray-500">Veuillez d'abord sélectionner une date</p>
      </div>
    );
  }

  // Generate slots from 10:00 to 19:00 every 30 mins
  // Saturday close at 18:00
  const isSaturday = selectedDate.getDay() === 6;
  const endHour = isSaturday ? 18 : 19;
  
  const slots = [];
  for (let hour = 10; hour < endHour; hour++) {
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }
  // Add last slot if needed depending on logic, but usually we stop taking appointments slightly before close
  
  // Format selected date for checking booked slots
  const dateStr = format(selectedDate, 'yyyy-MM-dd');

  return (
    <div className="bg-white p-6 border border-[#d4b896]/30 rounded-sm h-full flex flex-col">
      <h3 className="text-lg font-medium text-[#2d4a3e] mb-2 capitalize">
        {format(selectedDate, 'EEEE d MMMM', { locale: fr })}
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Horaires disponibles
      </p>
      
      <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-1">
        {slots.map((time) => {
          // Check if slot is booked
          const slotKey = `${dateStr}_${time}`;
          const isBooked = bookedSlots.includes(slotKey);
          
          return (
            <button
              key={time}
              disabled={isBooked}
              onClick={() => onSelectTime(time)}
              className={cn(
                "py-2 px-3 text-sm border rounded-sm transition-all text-center",
                selectedTime === time 
                  ? "bg-[#d4b896] border-[#d4b896] text-[#2d4a3e] font-medium" 
                  : "border-gray-200 hover:border-[#d4b896] text-gray-700",
                isBooked && "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed decoration-slice"
              )}
            >
              {time}
            </button>
          );
        })}
      </div>
      
      {slots.length === 0 && (
        <p className="text-center text-gray-500 my-auto">
          Aucun créneau disponible pour cette date.
        </p>
      )}
    </div>
  );
}