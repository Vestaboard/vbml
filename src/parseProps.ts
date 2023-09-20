import { VBMLProps } from "./types";
import mustache from "mustache";

import curry from "lodash/fp/curry";

export const parseProps = curry((props: VBMLProps, template: string) => {
  return mustache.render(template, props);
});
