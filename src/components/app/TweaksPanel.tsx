type Palette = "dark" | "cream";
type Density = "compact" | "regular" | "comfy";

interface Props {
  palette: Palette;
  density: Density;
  showProgress: boolean;
  onPaletteChange: (palette: Palette) => void;
  onDensityChange: (density: Density) => void;
  onShowProgressChange: (value: boolean) => void;
}

const PALETTES: Palette[] = ["dark", "cream"];
const DENSITIES: Density[] = ["compact", "regular", "comfy"];

export function TweaksPanel({
  palette,
  density,
  showProgress,
  onPaletteChange,
  onDensityChange,
  onShowProgressChange,
}: Props) {
  return (
    <aside className="tweaks-panel" aria-label="Preview tweaks">
      <div className="tweaks-head">
        <strong>Tweaks</strong>
        <span>Preview</span>
      </div>

      <div className="tweaks-body">
        <section className="tweaks-section">
          <div className="tweaks-section-label">Palette</div>
          <div className="tweaks-field">
            <div className="tweaks-label-row">
              <span className="tweaks-label">Surface</span>
              <span className="tweaks-value">{palette}</span>
            </div>
            <div className="tweaks-seg" role="radiogroup" aria-label="Surface palette">
              {PALETTES.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={option === palette ? "is-active" : undefined}
                  aria-pressed={option === palette}
                  onClick={() => onPaletteChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="tweaks-section">
          <div className="tweaks-section-label">Display</div>
          <div className="tweaks-field tweaks-field-inline">
            <div className="tweaks-label-row">
              <span className="tweaks-label">Progress bars</span>
            </div>
            <button
              type="button"
              className={"tweaks-toggle" + (showProgress ? " is-on" : "")}
              aria-pressed={showProgress}
              aria-label={showProgress ? "Hide progress bars" : "Show progress bars"}
              onClick={() => onShowProgressChange(!showProgress)}
            >
              <span />
            </button>
          </div>

          <div className="tweaks-field">
            <div className="tweaks-label-row">
              <span className="tweaks-label">Density</span>
              <span className="tweaks-value">{density}</span>
            </div>
            <div className="tweaks-seg" role="radiogroup" aria-label="Density">
              {DENSITIES.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={option === density ? "is-active" : undefined}
                  aria-pressed={option === density}
                  onClick={() => onDensityChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
