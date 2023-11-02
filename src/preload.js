// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electron', {
    readUsers: () => ipcRenderer.invoke('readUsers'),
    writeUsers: (content) => ipcRenderer.invoke('writeUser',content),
    readReports: () => ipcRenderer.invoke('readReports'),
    writeReports: (content) => ipcRenderer.invoke('writeReports',content),
    readPays: () => ipcRenderer.invoke('readPays'),
    writePays: (content) => ipcRenderer.invoke('writePays',content),
})