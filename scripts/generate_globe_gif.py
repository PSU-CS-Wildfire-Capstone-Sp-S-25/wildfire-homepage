#!/usr/bin/env python3
"""
Generate a rotating globe GIF using Basemap + imageio.

Example:
  python3 scripts/generate_globe_gif.py --out-dir /tmp/globe --gif movie.gif
"""

from __future__ import annotations

import argparse
from pathlib import Path

import imageio.v2 as imageio
import matplotlib.pyplot as plt
from mpl_toolkits.basemap import Basemap


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate rotating globe GIF")
    parser.add_argument("--out-dir", required=True, help="Directory for PNG frames")
    parser.add_argument("--gif", default="movie.gif", help="Output GIF filename")
    parser.add_argument("--step", type=int, default=20, help="Longitude step in degrees")
    parser.add_argument("--duration", type=float, default=0.5, help="Frame duration for GIF")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    out_dir = Path(args.out_dir).expanduser().resolve()
    out_dir.mkdir(parents=True, exist_ok=True)

    frames: list[Path] = []
    for lon in range(0, 330, args.step):
        fig = plt.figure(figsize=(6, 6), dpi=120)
        globe = Basemap(
            projection="ortho",
            lat_0=0,
            lon_0=lon,
            resolution="l",
            area_thresh=1000.0,
        )
        globe.bluemarble()
        globe.etopo()
        frame_path = out_dir / f"{lon}.png"
        fig.savefig(frame_path, bbox_inches="tight", pad_inches=0)
        plt.close(fig)
        frames.append(frame_path)

    images = [imageio.imread(frame) for frame in frames]
    imageio.mimsave(out_dir / args.gif, images, duration=args.duration)
    print(f"Generated {len(frames)} frames and GIF at: {out_dir / args.gif}")


if __name__ == "__main__":
    main()
