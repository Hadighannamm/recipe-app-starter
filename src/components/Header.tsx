import type { AppUser } from "../types/auth";

type HeaderProps = {
  user: AppUser | null;
  onSignOut: () => void;
  onSignInClick: () => void;
};

export default function Header({ user, onSignOut, onSignInClick }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <h1>Recipe Manager</h1>
        <p>Your favorite recipes, shared with everyone.</p>
      </div>
      <div>
        {user ? (
          <div className="auth-status">
            <span>Signed in as: <strong>{user.email}</strong></span>
            <button className="btn-outline" onClick={onSignOut}>Sign Out</button>
          </div>
        ) : (
          <div className="auth-status">
            <span>Viewing as Guest</span>
            <button onClick={onSignInClick}>Sign In / Sign Up</button>
          </div>
        )}
      </div>
    </header>
  );
}
