import { useFormContext } from 'react-hook-form';

export default function useLateTime() {
  const { watch } = useFormContext();
  const hour = watch('contents.lateTime').split(':')[0];
  const minute = watch('contents.lateTime').split(':')[1];
  let lateHour = hour.replace(/(^0+)/, '');
  const lateMinute = minute?.replace(/(^0+)/, '');
  let lateAmpm = '';
  if (!lateHour) {
    lateAmpm = '오후';
  } else if (lateHour < 13) {
    lateAmpm = '오전';
  } else {
    lateHour -= 12;
    lateAmpm = '오후';
  }

  lateHour = (!lateHour) ? 12 : lateHour;

  return {
    lateAmpm, lateHour, lateMinute,
  };
}
