import {
  DevicePhoneMobileIcon,
  EyeSlashIcon,
  RectangleStackIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { VALUE_PROPS } from "lib/landing";

const ICONS = {
  layers: RectangleStackIcon,
  shield: ShieldCheckIcon,
  device: DevicePhoneMobileIcon,
  eye: EyeSlashIcon,
};

export function ValuePropositionSection() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-t border-[#2A2A30] bg-[#0B0B0D] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Warum MintCase?
          </h2>
          <p className="text-neutral-400">
            Wir haben eine smarte Art entwickelt, das mitzuführen, was du brauchst.
            Leise, sauber und gemacht für unterwegs.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-[#2A2A30] bg-[#141418] p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#AEE2DB]/10">
                  <Icon className="h-6 w-6 text-[#AEE2DB]" />
                </div>
                <h3 className="mb-3 text-lg font-medium text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
