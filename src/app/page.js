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
				<h1 className="text-2xl font-bold mb-2">FULL STACK
					DEVELOPER</h1>
				<h2 className="text-xl text-gray-600 mb-4">KLEVERT OPEE</h2>
				<div
					className="prose prose-sm md:prose-base lg:prose-lg w-full">
					<p>
						My journey into the world of software development
						began with a
						fascination for how technology could solve
						real-world problems.
						That fascination led me to pursue a degree in
						Computer Science,
						which I completed in 2022. The two years following
						graduation
						were spent at Uwezo Endelevu Consultancy, where I
						honed my
						skills and gained invaluable experience building and
						launching
						web applications. It was there that I truly learned
						the
						importance of not just writing code, but crafting
						solutions
						that are secure, scalable, and performant.
					</p>
					<p>
						I'm a firm believer in using the right tool for the
						job, so I
						don't limit myself to specific programming
						languages. Whether
						it's Golang, Python, Java, or something else
						entirely, I'm
						always eager to dive into the language that best
						fits the project
						at hand. You can see some examples of my work on my
						GitHub
						profile. Currently, I'm channeling my
						problem-solving skills
						into building a SaaS product. It's an exciting
						project, and
						I'm looking forward to sharing more about it soon.
					</p>
					<p>
						Outside of coding, I'm an avid reader of technical
						programming
						books. I believe continuous learning is key in this
						ever-evolving field, and I'm always eager to explore
						new
						techniques and best practices. I also enjoy sharing
						my own
						programming journey and insights. While I don't
						currently
						maintain a blog, it's something I'm considering for
						the future,
						as I believe in the power of sharing knowledge and
						experiences
						within the developer community. Ultimately, I'm
						driven by a
						desire to create impactful and user-focused
						experiences, and
						I'm always looking for new challenges to tackle.
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
