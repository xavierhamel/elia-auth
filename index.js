import {tauri} from '@tauri-apps/api';

console.log(tauri, __TAURI_IPC__)
const js = document.querySelector('#javascript');
js.className = '';
if (tauri) {
    console.log('tauri');
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);
    window.ipc.postMessage("")
    tauri.invoke('save_auth_fragment', {fragment: code});
    if (code) {
        js.innerHTML = 'You will be redirected in a moment.';
        tauri.invoke('restore_location').then((location) => {
          document.location.replace(location);
        });
    } else {
        js.innerHTML = 'Error: Access Token not found.';
    }
} else {
    console.log('fail')
    tauri.invoke('save_auth_fragment', {fragment: 'fail'});
}
//} else {
//document.location.replace(`${document.location.pathname}#no_tauri`);
//js.innerHTML = 'Error: This page only works in the ELIA Desktop app.';
//}
