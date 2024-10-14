import React, { useState } from 'react';
import { ElectronAPI } from 'src/preload';
import log from 'electron-log/renderer';

interface FirstTimeSetupProps {
  onComplete: (selectedDirectory: string) => void;
}

const FirstTimeSetup: React.FC<FirstTimeSetupProps> = ({ onComplete }) => {
  const [selectedPath, setSelectedPath] = useState<string>('');
  const electronAPI: ElectronAPI = (window as any).electronAPI;

  const handleDirectorySelect = async () => {
    const options: Electron.OpenDialogOptions = {
      title: 'Select a directory',
      properties: ['openDirectory', 'createDirectory'],
    };
    const directory = await electronAPI.openDialog(options);
    if (directory && directory.length > 0) {
      log.info('Selected directory', directory[0]);
      setSelectedPath(directory[0]);
    } else {
      log.error('No directory selected');
    }
  };

  const handleInstall = () => {
    if (selectedPath) {
      log.info('Installing to directory', selectedPath);
      electronAPI.selectSetupDirectory(selectedPath);
      onComplete(selectedPath);
    } else {
      log.error('No directory selected for installation');
      alert('Please select a directory before installing.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Install ComfyUI</h1>
      <p style={styles.description}>
        Please select a directory for where ComfyUI will store models, outputs, etc. If you already have a ComfyUI
        setup, you can select that to reuse the model files.
      </p>
      <button onClick={handleDirectorySelect} style={styles.selectButton}>
        Select Directory
      </button>
      {selectedPath && (
        <div style={styles.pathDisplay}>
          <p>{selectedPath}</p>
        </div>
      )}
      <button
        onClick={handleInstall}
        disabled={!selectedPath}
        style={{ ...styles.button, ...(selectedPath ? styles.installButton : styles.disabledButton) }}
      >
        Install
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    justifyContent: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#ffffff',
  },
  description: {
    textAlign: 'center' as const,
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '10px',
    borderRadius: '3px',
    border: 'none',
    fontWeight: 'bold',
  },
  selectButton: {
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '10px',
    borderRadius: '3px',
    border: 'none',
    fontWeight: 'bold',
    backgroundColor: '#0078d4',
    color: '#ffffff',
  },
  pathDisplay: {
    marginTop: '10px',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#2d2d2d',
    borderRadius: '3px',
    width: '100%',
    color: '#d4d4d4',
    textAlign: 'center'
  },
  installButton: {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
  },
  disabledButton: {
    backgroundColor: '#4d4d4d',
    color: '#a0a0a0',
    cursor: 'not-allowed',
  },
};

export default FirstTimeSetup;
