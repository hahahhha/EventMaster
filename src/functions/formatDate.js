import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';


function formatDate(dateString) {
  return format(parseISO(dateString), "d MMMM yyyy 'в' HH:mm", { locale: ru });
};

export default formatDate;