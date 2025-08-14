import {Section} from "./Section"
import { Cards } from "./Cards";

export const Projects = () => {
  return (
    <Section>
      <h1 className="text-2xl md:text-6xl font-extrabold leading-snug mb-3">Projects</h1>

      <div className="p-2 md:p-10 flex gap-5">
        <Cards />
      </div>
    </Section>
  );
};