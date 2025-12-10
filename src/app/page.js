import {Separator} from '@/components/ui/separator';
import {Bookmark, Github, Mail} from "lucide-react";
import Image from "next/image";


export default function Home() {
    return (<div className="p-4 md:p-6 border-2 rounded-md shadow-sm bg-white">
        <div className="flex flex-col md:flex-row items-start">
            <div
                className="relative w-48 md:w-56 lg:w-64 h-auto mr-0 md:mr-6 mb-4 md:mb-0">
                <Image
                    src="/profile.png"
                    width={200}
                    height={200}
                    alt="My picture"
                    className="rounded-full bg-[var(--background)] object-cover w-full h-full"
                />
            </div>
            <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">FULL STACK & BLOCKCHAIN SYSTEMS ENGINEER</h1>
                <h2 className="text-xl text-gray-600 mb-4">KLEVERT OPEE</h2>
                <div
                    className="prose prose-sm md:prose-base lg:prose-lg w-full">
                    <p>
                        I am a highly adaptable Full Stack Software Developer with over five years of end-to-end
                        application development experience, specializing in high-performance services and resilient
                        systems engineering across backend, frontend, and cutting-edge blockchain systems. My background
                        is rooted in delivering robust solutions, from architecture to deployment, across diverse
                        technologies like Java (Spring Boot), Node.js, Javascript, React + Vite, and various databases.
                    </p>
                    <p>
                        Currently, I lead full-stack development and systems investigations at a UAE digital-assets
                        trading firm. My focus is on building critical, high-stakes infrastructure, including:
                    </p>
                    <ol>
                        <li>
                            Developing sophisticated crypto monitoring and investigation platforms integrated with tools
                            like Chainalysis
                        </li>
                        <li>
                            Designing and deploying internal digital-asset accounting software for high-volume OTC
                            operations (PnL, reconciliation).
                        </li>
                        <li>
                            Creating high-performance backend systems and automating compliance/alerting workflows using
                            Python and Telegram bots.
                        </li>
                    </ol>
                    <p>
                        This experience has solidified my ability to independently manage the full Software Development
                        Lifecycle (SDLC)—architecture, development, deployment (AWS, Docker, CI/CD), and maintenance—all
                        while ensuring strong security via encryption, JWT, and OAuth2. I am driven by the challenge of
                        creating impactful, user-focused experiences and am continually seeking new challenges to
                        tackle.
                    </p>
                </div>
                <Separator className="my-4"/>
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-2">Say Hi</h3>
                    <ul className="space-y-2 list-none">
                        <li>
                            <a href="mailto:info@klevertopee.app"
                               className="flex flex-row space-x-2 items-center">
                                <Mail/> <span
                                className="text-blue-500">info@klevertopee.app</span></a>
                        </li>
                        <li>
                            <a href="https://github.com/klevert-ope"
                               target="_blank" rel="noopener noreferrer"
                               className="flex flex-row space-x-2 items-center"><Github/><span
                                className="text-blue-500">GitHub</span></a>
                        </li>
                        <li>
                            <a href="https://medium.com/@klevertope"
                               target="_blank" rel="noopener noreferrer"
                               className="flex flex-row space-x-2 items-center"><Bookmark/><span
                                className="text-blue-500">Medium</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>);
}
