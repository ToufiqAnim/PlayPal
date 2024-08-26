export const AvailableTimeSlots = (
  bookedSlots: Array<{ startTime: string; endTime: string }>,
): Array<{ startTime: string; endTime: string }> => {
  const openingTime = '08:00';
  const closingTime = '20:00';

  // Start with a full-day slot
  let availableSlots = [{ startTime: openingTime, endTime: closingTime }];

  // Adjust available slots based on booked slots
  bookedSlots.forEach((booked) => {
    availableSlots = availableSlots.flatMap((slot) => {
      if (
        booked.endTime <= slot.startTime ||
        booked.startTime >= slot.endTime
      ) {
        return [slot];
      }

      const slots = [];

      if (booked.startTime > slot.startTime) {
        slots.push({ startTime: slot.startTime, endTime: booked.startTime });
      }

      if (booked.endTime < slot.endTime) {
        slots.push({ startTime: booked.endTime, endTime: slot.endTime });
      }

      return slots;
    });
  });

  return availableSlots;
};
