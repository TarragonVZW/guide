import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Password: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return null
}

Password.beforeDOMLoaded = `
(function() {
  const PASSWORD = "dragon" // Change this to your desired password
  const isVerified = sessionStorage.getItem("password_verified") === "true"

  if (isVerified) {
    document.documentElement.classList.add("verified")
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("password_verified") === "true") {
      return
    }

    const overlay = document.createElement("div")
    overlay.id = "password-overlay"
    overlay.innerHTML = \`
      <div id="password-container">
        <h2>Locked</h2>
        <p>This site is password protected.</p>
        <div class="password-input-group">
          <input type="password" id="password-input" placeholder="Password">
          <button id="password-submit">Submit</button>
        </div>
        <p id="password-error" style="color: #ff4444; display: none; margin-top: 1rem;">Incorrect password.</p>
      </div>
    \`
    document.body.appendChild(overlay)

    const input = document.getElementById("password-input")
    const submit = document.getElementById("password-submit")
    const error = document.getElementById("password-error")

    const check = () => {
      if (input.value === PASSWORD) {
        sessionStorage.setItem("password_verified", "true")
        document.documentElement.classList.add("verified")
        overlay.remove()
      } else {
        error.style.display = "block"
        input.value = ""
        input.focus()
      }
    }

    submit.addEventListener("click", check)
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") check()
    })
    
    // focus input
    input.focus()
  })
})()
`

Password.css = `
:root:not(.verified) body > *:not(#password-overlay) {
  display: none !important;
}

#password-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

#password-container {
  padding: 3rem;
  background: var(--lightgray);
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 90%;
}

#password-container h2 {
  margin-top: 0;
  color: var(--dark);
}

#password-container p {
  color: var(--darkgray);
}

.password-input-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
}

#password-input {
  flex-grow: 1;
  padding: 0.6rem 1rem;
  border: 1px solid var(--gray);
  border-radius: 6px;
  background: var(--light);
  color: var(--dark);
  font-size: 1rem;
}

#password-submit {
  padding: 0.6rem 1.2rem;
  background: var(--secondary);
  color: var(--light);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}

#password-submit:hover {
  opacity: 0.85;
}
`

export default (() => Password) satisfies QuartzComponentConstructor
