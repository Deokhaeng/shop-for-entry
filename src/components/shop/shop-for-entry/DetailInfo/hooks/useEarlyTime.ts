import { useFormContext } from 'react-hook-form';

export default function useEarlyTime() {
  const { watch } = useFormContext();
  const hour = watch('contents.earlyTime').split(':')[0];
  const minute = watch('contents.earlyTime').split(':')[1];
  let earlyHour = hour.replace(/(^0+)/, '');
  const earlyMinute = minute?.replace(/(^0+)/, '');
  let earlyAmpm = '';
  if (!earlyHour) {
    earlyAmpm = '오후';
  } else if (earlyHour < 13) {
    earlyAmpm = '오전';
  } else {
    earlyHour -= 12;
    earlyAmpm = '오후';
  }

  earlyHour = (!earlyHour) ? '12' : earlyHour;

  return {
    earlyAmpm, earlyHour, earlyMinute,
  };
}
