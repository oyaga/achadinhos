"use client";

import { useEffect, useState } from "react";
import { getImageUrl, isVideoFile, isVideoLink } from "@/lib/api";
import { Icon } from "../icons";

function youtubeId(url: string): string | null {
  const m = (url ?? "").match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/i
  );
  return m ? m[1] : null;
}

function vimeoId(url: string): string | null {
  const m = (url ?? "").match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return m ? m[1] : null;
}

// Miniatura de um item de vídeo do portfólio (link YouTube/Vimeo ou arquivo
// enviado), com um ícone de play sobreposto. Resolve o poster por origem e cai
// graciosamente no fundo + play quando não há thumbnail disponível.
export function VideoThumbnail({ url }: { url: string }) {
  const [poster, setPoster] = useState<string | null>(null);

  useEffect(() => {
    setPoster(null);
    if (isVideoLink(url)) {
      const yt = youtubeId(url);
      if (yt) {
        setPoster(`https://img.youtube.com/vi/${yt}/hqdefault.jpg`);
        return;
      }
      if (vimeoId(url)) {
        let alive = true;
        fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`)
          .then((r) => (r.ok ? r.json() : null))
          .then((d) => {
            if (alive && d?.thumbnail_url) setPoster(d.thumbnail_url as string);
          })
          .catch(() => {
            /* sem thumb — fica só o play */
          });
        return () => {
          alive = false;
        };
      }
    }
  }, [url]);

  const showFileFrame = !poster && isVideoFile(url);

  return (
    <span className="pd-video-thumb">
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="Vídeo do portfólio" loading="lazy" decoding="async" />
      ) : showFileFrame ? (
        <video
          src={`${getImageUrl(url)}#t=0.1`}
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
      ) : null}
      <span className="pd-video-play" aria-hidden>
        <Icon.Play size={20} />
      </span>
    </span>
  );
}
