import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  saveReport: (data: string) => ipcRenderer.invoke('save-report', data)
});