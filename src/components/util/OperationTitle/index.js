import { INT_TO_MONTHS } from "../../../lib/Constants";

import Title from "../Title";

export default function OperationTitle({
  title,
  month,
  year,
  operation
}) {
  return (<Title>
    {title} {INT_TO_MONTHS[month]}, {year} - {operation}
  </Title>);
}
