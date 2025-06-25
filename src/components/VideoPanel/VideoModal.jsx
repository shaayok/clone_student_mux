import React from 'react';
import MuxPlayer from '@mux/mux-player-react';
import ReactMarkdown from 'react-markdown';
import styles from './VideoModal.module.css';

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;


  console.log("🔍 modalVideo:", video);

  const playbackId = video.url;
  const timestamp  = video.timestamp || new Date().toLocaleString();
  const analysis   = video.analysis || 'Geen analyse beschikbaar.';

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <div className={styles.header}>
          <span className={styles.timestamp}>{timestamp}</span>
          <span className={styles.analysisLabel}>AI Analyse</span>
        </div>

        <div className={styles.body}>
          <div className={styles.videoContainer}>
            {playbackId
              ? <MuxPlayer
                  playbackId={playbackId}
                  streamType="on-demand"
                  metadata={{
                    video_id:   video.id,
                    video_title: video.title || 'Onbekende Video',
                  }}
                  controls
                  playsInline
                  style={{ width: '100%', height: '100%' }}
                />
              : <p className={styles.unavailable}>Video niet beschikbaar</p>
            }
          </div>

          {/* Wrap the markdown in a styled div */}
          <div className={styles.analysisContainer}>
            <div className={styles.analysisText}>
              <ReactMarkdown>
                {analysis}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
