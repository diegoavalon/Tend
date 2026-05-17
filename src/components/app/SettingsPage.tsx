import { useEffect, useRef, useState } from "react";
import { AppShell } from "./AppShell";
import { Icon } from "./Icons";
import { SelectField } from "../ui/SelectField";
import { SwitchField } from "../ui/SwitchField";

const FEED_URL = "https://tend.app/feed/dc5e1f1f3a4f8b9c.ics";
const TIMEZONE_OPTIONS = [
  { value: "America/New_York", label: "America/New_York" },
  { value: "America/Chicago", label: "America/Chicago" },
  { value: "America/Denver", label: "America/Denver" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles" },
  { value: "Europe/London", label: "Europe/London" },
  { value: "Europe/Madrid", label: "Europe/Madrid" },
  { value: "Europe/Berlin", label: "Europe/Berlin" },
] as const;

export function SettingsPage() {
  const [timezone, setTimezone] = useState("America/New_York");
  const [morning, setMorning] = useState("07:30");
  const [midday, setMidday] = useState("12:30");
  const [evening, setEvening] = useState("18:30");
  const [digest, setDigest] = useState("07:30");
  const [tomorrowHeadsUp, setTomorrowHeadsUp] = useState(true);
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (copiedTimerRef.current !== null) {
      window.clearTimeout(copiedTimerRef.current);
    }
  }, []);

  const copyFeed = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(FEED_URL);
    }

    setCopied(true);

    if (copiedTimerRef.current !== null) {
      window.clearTimeout(copiedTimerRef.current);
    }

    copiedTimerRef.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <AppShell active="settings">
      <main className="main">
        <header className="screen-head">
          <div className="left">
            <div className="crumbs">Account · Settings</div>
            <h1>Settings</h1>
            <div className="meta">One screen of knobs. Defaults are sensible — change what you actually need.</div>
          </div>
        </header>

        <div className="col-pair">
          <div>
            <section className="panel">
              <h2><Icon name="user" size={16} />Profile</h2>
              <div className="setting-row">
                <div>
                  <div className="label">Email</div>
                  <div className="hint">Magic-link sign-in. Used for the daily digest too.</div>
                </div>
                <input className="input-flat input-wide" defaultValue="diego@avalon.farm" />
              </div>
              <div className="setting-row">
                <div>
                  <div className="label">Display name</div>
                  <div className="hint">Shown in the dashboard greeting and the digest subject line.</div>
                </div>
                <input className="input-flat" defaultValue="Diego" />
              </div>
              <div className="setting-row">
                <div>
                  <div className="label">Timezone</div>
                  <div className="hint">All windows and digest delivery resolve to this clock.</div>
                </div>
                <SelectField
                  className="input-wide"
                  name="timezone"
                  options={TIMEZONE_OPTIONS}
                  value={timezone}
                  onValueChange={setTimezone}
                />
              </div>
            </section>

            <section className="panel">
              <h2><Icon name="clock" size={16} />Window times</h2>
              <div className="panel-sub">Sub-daily counters fire at these clock times. Set once — every template uses them.</div>
              <div className="setting-row setting-row-wide">
                <div>
                  <div className="label">Morning · midday · evening</div>
                  <div className="hint">The three semantic windows every sub-daily task references.</div>
                </div>
                <div className="window-times">
                  <div className="col">
                    <input className="input-flat" type="time" value={morning} onChange={(event) => setMorning(event.target.value)} />
                    <span className="when">Morning</span>
                  </div>
                  <div className="col">
                    <input className="input-flat" type="time" value={midday} onChange={(event) => setMidday(event.target.value)} />
                    <span className="when">Midday</span>
                  </div>
                  <div className="col">
                    <input className="input-flat" type="time" value={evening} onChange={(event) => setEvening(event.target.value)} />
                    <span className="when">Evening</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="panel">
              <h2><Icon name="mail" size={16} />Daily digest</h2>
              <div className="panel-sub">Lands every morning with the day's full task list across all batches.</div>
              <div className="setting-row">
                <div>
                  <div className="label">Delivery time</div>
                  <div className="hint">Pick a time you actually check email. We send at this clock in your timezone.</div>
                </div>
                <input className="input-flat" type="time" value={digest} onChange={(event) => setDigest(event.target.value)} />
              </div>
              <div className="setting-row">
                <div>
                  <div className="label">Tomorrow&apos;s heads-up</div>
                  <div className="hint">Include a short "tomorrow" section below today&apos;s list.</div>
                </div>
                <SwitchField checked={tomorrowHeadsUp} onCheckedChange={setTomorrowHeadsUp}>
                  {tomorrowHeadsUp ? "On" : "Off"}
                </SwitchField>
              </div>
            </section>
          </div>

          <aside>
            <section className="panel" id="feed">
              <h2><Icon name="calendar" size={16} />Calendar feed</h2>
              <div className="panel-sub">
                Subscribe once on each device. Sub-daily windows fire as timed
                events; scheduled tasks as silent all-day events; observation
                windows as multi-day events spanning the window plus tolerance.
              </div>
              <div className="feed-url">
                <code>{FEED_URL}</code>
                <button type="button" onClick={() => { void copyFeed(); }}>{copied ? "Copied ✓" : "Copy"}</button>
              </div>
              <div className="panel-sub panel-sub-note">
                Treat this URL as a password. If it leaks, regenerate it.
              </div>
              <button type="button" className="btn-secondary btn-align-start">Regenerate feed token</button>
            </section>

            <section className="panel">
              <h2><Icon name="shield-check" size={16} />Sign in</h2>
              <div className="panel-sub">
                We sign you in with a magic link sent to your email. Sessions stay
                long-lived on each device until you sign out.
              </div>
              <button type="button" className="btn-secondary btn-align-start">
                <Icon name="log-out" size={14} /> Sign out of this device
              </button>
            </section>

            <section className="panel panel-danger">
              <h2 className="panel-danger-title"><Icon name="alert-triangle" size={16} />Danger zone</h2>
              <div className="panel-sub">
                Deleting your account removes every batch, observation, and the
                calendar feed token. Archived batches go with it. Can&apos;t be undone.
              </div>
              <button
                type="button"
                className="btn-secondary btn-align-start btn-danger-secondary"
              >
                Delete account
              </button>
            </section>
          </aside>
        </div>
      </main>
    </AppShell>
  );
}
