import React from 'react';
import { usePage } from "@inertiajs/inertia-react";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import { getVideoType } from "@/Helper";

export const Video = ({ data, width = 1920, height = 788, autoPlay = false, controls = true }) => {
    const { base } = usePage().props;

    return data.video ? (
        <video
            width={width}
            height={height}
            className="video-js"
            autoPlay={autoPlay}
            controls={controls}
            preload={false}
            poster={`${base}/storage/${data.image}`
            }
            data-setup="{}">
            <source src={`${base}/storage/${data.video}`} type={`video/${getVideoType(data.video)}`} />
        </video>
    ) : (
        <img src={`${base}/storage/${data.image}`} />
    );
};
