import dateParser from "@/utils/parsers/dateParser";
import type { FunctionComponent } from "preact";
import "./PostDate.scss";

const PostDate: FunctionComponent<{
  date: string;
  dateFormat?: "date" | "month";
}> = ({ date, dateFormat = "date" }) => {
  const formattedDate = dateParser(date);
  return (
    <div class="intro__date">
      <section class="date">
        {dateFormat !== "month" ? (
          <>
            <div class="date__block rounded">
              <span class="date__month">{formattedDate.format("MMM")}</span>
              <span class="date__day">{formattedDate.format("DD")}</span>
            </div>
            <div>
              <span class="date__year">{formattedDate.format("YYYY")}</span>
            </div>
          </>
        ) : (
          <>
            <div class="date__block rounded">
              <span class="date__year">{formattedDate.format("YYYY")}</span>
              <span class="date__month">{formattedDate.format("MMM")}</span>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default PostDate;
