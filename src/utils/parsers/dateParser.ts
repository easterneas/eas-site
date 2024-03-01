import dateParser from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dateParser.extend(relativeTime);

export default dateParser;
