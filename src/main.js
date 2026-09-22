import { mount } from 'svelte';
import './i18n.js';
import App from './App.svelte';
import './styles.css';

mount(App, {
  target: document.getElementById('app'),
});
