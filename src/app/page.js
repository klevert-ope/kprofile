import {Separator} from '@/components/ui/separator';
import {Github, Mail} from "lucide-react";
import Image from "next/image";


export default function Home() {
    return (<div className="p-8 md:p-16 lg:p-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-2 lg:col-span-2">
                <div className="relative w-24 md:w-28 h-auto mx-auto md:mx-0">
                    <Image
                        src="/profile.png"
                        width={150}
                        height={150}
                        alt="My picture"
                        className="rounded-full bg-[#EDEADE] object-cover w-full h-full"
                    />
                </div>
            </div>
            <div className="md:col-span-10 lg:col-span-10 md:pl-8">
                <p className="text-[11px] font-medium tracking-[0.25em] text-gray-500 uppercase mb-3">Full Stack Software Engineer</p>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-gray-900">Klevert Opee</h1>
                <div className="space-y-4 text-base leading-[1.7] text-gray-700">
                    <p>
                        I am a Full Stack Software Engineer with a primary interest in systems research and the mechanics of high-performance engineering.
                        With over five years of experience in end-to-end application development, my focus has gravitated toward investigating how complex,
                        resilient systems can be optimized for maximum efficiency and reliability.
                    </p>
                    <p>
                        I view software development as a continuous research process moving beyond implementation to explore the underlying architecture 
                        of distributed services and decentralized infrastructures. My goal is to bridge the gap between theoretical system design and the 
                        practical realities of deploying secure, scalable solutions that stand up to real-world demands.
                    </p>
                </div>
            </div>
        </div>

        <div className="my-12 md:my-16 border-t border-gray-200"/>

        <div className="mb-12 md:mb-16">
            <p className="text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase mb-10">Current Research & Initiatives</p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-10">
                <div className="md:col-span-6">
                    <h3 className="text-base font-semibold tracking-wide text-cyan-500 mb-2">Hardware-Rooted Data Integrity</h3>
                    <p className="text-sm leading-[1.7] text-gray-600">
                        Investigating "Pre-Facto" gatekeeping mechanisms designed to verify data validity and physical consistency at the hardware level.
                        This research focuses on establishing a sub-millisecond "Chain of Trust" for autonomous economies, ensuring data integrity before it reaches the execution layer.
                    </p>
                </div>
                <div className="md:col-span-6">
                    <h3 className="text-base font-semibold tracking-wide text-cyan-500 mb-2">Situational Awareness & Sensor Fusion</h3>
                    <p className="text-sm leading-[1.7] text-gray-600">
                        Work on Sentinel Core involves the fusion of multi-modal sensors including LiDAR, thermal, and mmWave radar to create real-time volumetric digital twins.
                        The goal is to develop sovereign grade monitoring systems that scale across complex, high security environments.
                    </p>
                </div>
                <div className="md:col-span-6">
                    <h3 className="text-base font-semibold tracking-wide text-cyan-500 mb-2">Unified Native Desktop Runtimes</h3>
                    <p className="text-sm leading-[1.7] text-gray-600">
                        Researching the development of a high performance desktop framework built entirely within the Rust ecosystem.
                        This project focuses on creating a vertically integrated stack where the UI rendering, custom styling engine, and final binary packaging are all natively handled to achieve a minimal footprint and maximum security.
                    </p>
                </div>
                <div className="md:col-span-6">
                    <h3 className="text-base font-semibold tracking-wide text-cyan-500 mb-2">High-Frequency UI Rendering</h3>
                    <p className="text-sm leading-[1.7] text-gray-600">
                        Developing a web based motion kernel designed for high frequency rendering, exploring how to bring the precision of systems level performance to web based interfaces.
                    </p>
                </div>
            </div>
        </div>

        <div className="my-12 md:my-16 border-t border-gray-200"/>

        <div>
            <p className="text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase mb-6">Connect</p>
            <ul className="space-y-4 list-none">
                <li>
                    <a href="mailto:info@klevertopee.app"
                       className="flex flex-row space-x-3 items-center text-sm text-gray-600 hover:text-cyan-400 transition-colors duration-300">
                        <Mail className="w-4 h-4 text-gray-400"/> <span className="font-light">info@klevertopee.app</span></a>
                </li>
                <li>
                    <a href="https://github.com/klevert-ope"
                       target="_blank" rel="noopener noreferrer"
                       className="flex flex-row space-x-3 items-center text-sm text-gray-600 hover:text-cyan-400 transition-colors duration-300"><Github className="w-4 h-4 text-gray-400"/><span className="font-light">GitHub</span></a>
                </li>
            </ul>
        </div>
    </div>);
}
