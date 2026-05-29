import { add } from '@demo/utils';

export function Button({ children }) {
  return `<button>${children}</button>`;
}

export function Card({ title, content }) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${content}</p>
      <p>${add(1, 2)}</p>
    </div>
  `;
}