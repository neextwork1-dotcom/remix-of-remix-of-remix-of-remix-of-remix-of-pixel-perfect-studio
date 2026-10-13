import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Truck, ShieldCheck, Headphones, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Trend Maker | Phyto Science" },
      { name: "description", content: "Sign in to your Phyto Science member account." },
      { property: "og:title", content: "Login — Trend Maker | Phyto Science" },
      { property: "og:description", content: "Sign in to your Phyto Science member account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

const features = [
  { icon: Truck, title: "Fast Delivery", text: "Prompt dispatch to your doorstep" },
  { icon: ShieldCheck, title: "Secure Payment", text: "100% secure transactions" },
  { icon: Headphones, title: "Customer Support", text: "Monday – Thursday, 9:30 am – 7:00 pm" },
];

function Login() {
  const [show, setShow] = useState(false);
  return (
    <div className="login-page">
      <div className="login-card">
        <aside className="login-side">
          <p className="login-side-eyebrow">WE ARE THE</p>
          <p className="login-side-brand">Trend Maker</p>
          <h1 className="login-side-title">Welcome Back!</h1>
          <p className="login-side-sub">Sign in to continue shopping and earn PV points</p>
          <ul className="login-side-features">
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="login-side-icon"><Icon size={22} strokeWidth={1.6} /></span>
                <span><strong>{title}</strong><small>{text}</small></span>
              </li>
            ))}
          </ul>
        </aside>
        <section className="login-main">
          <h2 className="login-title">Login to Your Account</h2>
          <p className="login-sub">Enter your username and password to continue.</p>
          <form className="login-form" onSubmit={e => e.preventDefault()}>
            <input className="login-input" type="text" name="username" placeholder="Username *" autoComplete="username" />
            <div className="login-password">
              <input className="login-input" type={show ? "text" : "password"} name="password" placeholder="Password *" autoComplete="current-password" />
              <button type="button" className="login-eye" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)}>
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="login-row">
              <label className="login-remember"><input type="checkbox" name="remember" /> Remember my username</label>
              <a className="login-link" href="https://app.iphyto.com/member/login.aspx" target="_blank" rel="noreferrer">Forgot password?</a>
            </div>
            <button className="login-submit" type="submit">Login</button>
            <div className="login-divider"><span>OR</span></div>
            <a className="login-link login-merchant" href="https://app.iphyto.com/member/login.aspx" target="_blank" rel="noreferrer">Merchant Login</a>
          </form>
        </section>
      </div>
    </div>
  );
}
