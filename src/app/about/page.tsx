export default function AboutPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12">
            <h1 className="mb-8 text-4xl font-bold">About Me</h1>
            <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                    I am a Machine Learning Engineer with a passion for developing innovative AI solutions
                    that solve real-world problems. My journey in the field of artificial intelligence
                    began during my academic years, where I developed a strong foundation in mathematics,
                    statistics, and computer science.
                </p>
                <p className="text-lg leading-relaxed">
                    Throughout my career, I have worked on diverse projects ranging from computer vision
                    applications to natural language processing systems. I specialize in designing and
                    implementing scalable machine learning pipelines, optimizing model performance, and
                    deploying AI solutions in production environments.
                </p>
                <h2 className="mt-8 text-2xl font-semibold">Core Expertise</h2>
                <ul className="list-inside list-disc space-y-2 text-lg">
                    <li>Deep Learning & Neural Networks</li>
                    <li>Computer Vision & Image Processing</li>
                    <li>Natural Language Processing</li>
                    <li>Machine Learning Operations (MLOps)</li>
                    <li>Data Analysis & Visualization</li>
                    <li>Cloud Computing & Distributed Systems</li>
                </ul>
                <h2 className="mt-8 text-2xl font-semibold">Education</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-medium">Ph.D. in Machine Learning</h3>
                        <p className="text-muted-foreground">University Name • 2018-2022</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium">M.Sc. in Computer Science</h3>
                        <p className="text-muted-foreground">University Name • 2016-2018</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium">B.Sc. in Computer Science</h3>
                        <p className="text-muted-foreground">University Name • 2012-2016</p>
                    </div>
                </div>
            </div>
        </div>
    )
}