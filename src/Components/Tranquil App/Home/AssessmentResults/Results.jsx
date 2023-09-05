import { useNavigate, useParams } from "react-router";
import "./Results.css";
import Nav from "../../Tranquil/Nav/Nav";
import { useEffect, useState } from "react";
import testFinished from "../../Assets/profileUpdateSuccess.svg";
import Spinner from "../../../Globals/Spinner/Spinner";

function Results() {
    var { test, score } = useParams();

    var possiblebriefs = [
        "Tranquil is here for you, over time you'll improve",
        "A good mental health is within your reach, keep building",
        "Nice one buddy, Keep building yourself",
        "This is a great result, weldone!",
    ];

    var [brief, setBrief] = useState("");

    const handlebrief = (x) => {
        setBrief(possiblebriefs[x]);
    };
    useEffect(() => {
        if (score <= 30) {
            handlebrief(0);
            return;
        } else if (score < 50) {
            handlebrief(1);
            return;
        } else if (score < 80) {
            handlebrief(2);
            return;
        } else if (score <= 100) {
            handlebrief(3);
            return;
        }
    });

    var [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (test === "Anxiety") {
            if (score <= 30) {
                setSuggestions([
                    "Consider a hospitalization program for intensive treatment and stabilization.",
                    "Work closely with a psychiatrist to find the right medication regimen.",
                    "Explore inpatient psychiatric care for intensive therapy and support",
                    "Lean on friends and family for assistance and emotional support",
                    "Identify and avoid situations or people that exacerbate anxiety",
                    "Consider holistic therapies like acupuncture, yoga, or art therapy",
                    "Focus on significant lifestyle adjustments to reduce stressors",
                    "Explore trauma-focused therapy if underlying trauma is a factor",
                ]);
            } else if (score < 50) {
                setSuggestions([
                    "Commit to therapy, such as CBT or talk therapy, to address anxiety",
                    "Discuss medication options with a psychiatrist as appropriate",
                    "Learn advanced stress management techniques like biofeedback",
                    "Focus on improving sleep quality through a healthy sleep routine",
                    "Practice self-compassion and avoid self-criticism",
                    "Enhance your ability to express your feelings and needs",
                    "Reduce exposure to triggering content on social media",
                    "Strive for a healthier work-life balance to reduce stressors",
                    "Learn assertiveness skills to effectively communicate boundaries",
                    "Create an emergency plan for acute anxiety episodes",
                ]);
            } else if (score < 80) {
                setSuggestions([
                    "Consider therapy to address anxiety-related thought patterns",
                    "Write down your thoughts and feelings to gain insight and reduce stress",
                    "Explore progressive muscle relaxation or guided imagery",
                    "Engage in yoga, tai chi, or other relaxation practices",
                    "Further reduce caffeine and sugar intake to stabilize mood",
                    "Establish a regular self-care routine to prioritize your well-being",
                    "Join a support group to connect with others experiencing anxiety",
                    "Allocate time each day for activities that you enjoy",
                    "Consider consulting a mental health professional for guidance",
                    "Talk to a doctor about prescription medications if appropriate",
                ]);
            } else if (score <= 100) {
                setSuggestions([
                    "Engage in mindfulness exercises or meditation to stay grounded and present",
                    "Prioritize regular exercise, a balanced diet, and adequate sleep",
                    "Spend time with friends and loved ones to strengthen your support system",
                    "Break down larger tasks into manageable steps to reduce stress",
                    "Pursue hobbies or interests that bring you joy and relaxation",
                    "Reduce consumption of substances that can increase anxiety",
                    "Learn and practice deep breathing techniques to calm your nerves",
                    "Reduce exposure to negative news to avoid unnecessary stress",
                    "Organize your schedule and prioritize tasks to reduce overwhelm",
                    "Challenge negative thoughts and replace them with positive affirmations",
                ]);
            }
        } else if (test === "Depression") {
            if (score <= 30) {
                setSuggestions([
                    "Seek urgent assistance from mental health crisis services or emergency departments.",
                    "Consider hospitalization for intensive treatment and safety.",
                    "Work closely with a psychiatrist to find the most effective medication regimen.",
                    "Explore inpatient psychiatric care for intensive therapy and monitoring.",
                    "Lean on friends and family for practical and emotional support.",
                    "Make an effort to stay connected with loved ones, even if it's challenging.",
                    "Discuss Electroconvulsive Therapy (ECT) as a potential treatment option with a psychiatrist.",
                    "Explore holistic therapies such as acupuncture and equine therapy.",
                    "Develop a comprehensive, long-term treatment plan for ongoing care.",
                    "Create a safety plan with strategies for coping with crisis situations.",
                ]);
            } else if (score < 50) {
                setSuggestions([
                    "Commit to regular therapy sessions to address underlying issues and develop coping strategies.",
                    "Discuss medication options with a psychiatrist if recommended.",
                    "Join a depression support group to connect with others facing similar challenges.",
                    "Improve time management skills to reduce stressors.",
                    "Maintain social connections, even when it feels challenging.",
                    "Consider Cognitive Behavioral Therapy (CBT) for structured and effective depression management.",
                    "Explore practices like yoga and tai chi for mind-body balance.",
                    "Seek help from professionals experienced in treating depression.",
                    "Make necessary changes in your lifestyle to support recovery.",
                    "Learn healthy ways to express and process your emotions.",
                ]);
            } else if (score < 80) {
                setSuggestions([
                    "Consider therapy, such as cognitive-behavioral therapy (CBT), to address depressive thoughts.",
                    "Establish a self-care routine with activities that nurture your mental health.",
                    "Prioritize good sleep hygiene practices for better rest.",
                    "Identify and reduce sources of stress in your life.",
                    "Reach out to friends and confide in them about your feelings.",
                    "Use creative expression, like art or writing, to process emotions.",
                    "Explore relaxation methods, such as deep breathing exercises.",
                    "Break tasks into smaller steps to build a sense of accomplishment.",
                    "Consult with a mental health professional about medication options if necessary.",
                    "Engage in volunteering to create a sense of purpose and connection.",
                ]);
            } else if (score <= 100) {
                setSuggestions([
                    "Establish a structured daily schedule to provide stability.",
                    "Engage in physical activity to boost mood and energy levels.",
                    "Spend time with friends and family to combat isolation.",
                    "Keep a gratitude journal to focus on positive aspects of life.",
                    "Engage in activities you enjoy to increase feelings of accomplishment.",
                    "Consume a balanced diet to support physical and mental well-being.",
                    "Get outdoors and soak up natural sunlight for mood improvement.",
                    "Practice mindfulness to stay grounded in the present.",
                    "Reduce consumption of substances that can worsen mood.",
                    "Explore self-help books on managing and overcoming depression.",
                ]);
            }
        } else if (test === "Stress") {
            if (score <= 30) {
                setSuggestions([
                    "Seek immediate assistance from mental health crisis services or emergency departments.",
                    "Consider hospitalization for intensive treatment and safety if needed.",
                    "Consult with a psychiatrist to assess the potential benefits of medication.",
                    "Explore inpatient psychiatric care for intensive stress management.",
                    "Rely on a strong support network of friends and family for emotional assistance.",
                    "Prioritize self-care and consider reducing work or personal responsibilities temporarily.",
                    "Participate in extended mindfulness retreats to focus on stress reduction and healing.",
                    "Have access to crisis hotlines or helplines for immediate support during difficult times.",
                    "Explore holistic therapies such as acupuncture or aromatherapy.",
                    "Collaborate with mental health professionals to create a long-term stress management plan.",
                ]);
            } else if (score < 50) {
                setSuggestions([
                    "Consider therapy or counseling to explore the root causes of your stress.",
                    "Enroll in Mindfulness-Based Stress Reduction (MBSR) programs for structured stress reduction.",
                    "Reevaluate your work-life balance and make necessary adjustments.",
                    "Develop strong conflict resolution skills to manage workplace or personal conflicts.",
                    "Maintain a stress journal to identify triggers and patterns in your stress response.",
                    "Join support groups or communities to connect with others facing similar stressors.",
                    "Attend meditation retreats for intensive stress relief and personal growth.",
                    "Ensure your physical health is in good condition through regular check-ups.",
                    "Dedicate time each day to unwind, whether through hobbies or relaxation exercises.",
                    "Set boundaries in your social and work life to prevent overwhelm.",
                ]);
            } else if (score < 80) {
                setSuggestions([
                    "Attend workshops or classes to learn stress management techniques.",
                    "Write in a journal to express your feelings and gain insight into your stressors.",
                    "Improve time management skills to better allocate your resources and reduce stress.",
                    "Consult with a therapist or counselor to address underlying stressors.",
                    "Explore mind-body techniques such as yoga or tai chi for relaxation.",
                    "Enhance your ability to navigate and resolve conflicts in a healthy way.",
                    "Share responsibilities with others to lighten your workload and reduce stress.",
                    "Spend time in nature, go for walks, or practice forest bathing for relaxation.",
                    "Reduce exposure to screens and digital devices to prevent information overload.",
                    "Listen to calming music or nature sounds to alleviate stress.",
                ]);
            } else if (score <= 100) {
                setSuggestions([
                    "Incorporate deep breathing or progressive muscle relaxation into your daily routine.",
                    "Create a well-organized daily schedule to manage responsibilities effectively.",
                    "Engage in regular physical activity to release endorphins and reduce stress.",
                    "Consume a nutritious diet rich in fruits, vegetables, and whole grains.",
                    "Prioritize a consistent sleep schedule to ensure restorative rest.",
                    "Reduce intake of stimulants that can exacerbate stress.",
                    "Dedicate time to activities you enjoy to unwind and recharge.",
                    "Practice mindfulness exercises to stay present and reduce anxiety.",
                    "Connect with friends and loved ones for emotional support and companionship.",
                    "Cultivate a positive mindset by challenging negative thoughts and beliefs.",
                ]);
            }
        } else if (test === "Eating Disorder") {
            if (score <= 30) {
                setSuggestions([
                    "Seek immediate assistance from an eating disorder treatment facility or crisis services.",
                    "Consider inpatient treatment for intensive therapy and medical supervision.",
                    "Participate in therapeutic meal support programs with clinical oversight.",
                    "Consult with a psychiatrist to assess the potential benefits of medication.",
                    "Establish a support system that is available around the clock for crisis intervention.",
                    "Focus on medical and nutritional rehabilitation under professional guidance.",
                    "Explore family-based treatment models for adolescents with eating disorders.",
                    "Collaborate with professionals to create a comprehensive long-term recovery plan.",
                    "Consider holistic therapies like art therapy or equine therapy.",
                    "Receive regular medical check-ups to monitor physical health.",
                ]);
            } else if (score < 50) {
                setSuggestions([
                    "Seek therapy specifically tailored for eating disorder recovery.",
                    "Join support groups for individuals with similar struggles to share experiences and coping strategies.",
                    "Consider meal support programs or eating disorder treatment centers.",
                    "Attend workshops that promote a positive body image and self-esteem.",
                    "Identify and address triggers that lead to disordered eating behaviors.",
                    "Assemble a treatment team, including therapists, dietitians, and medical professionals.",
                    "Work with a dietitian to create personalized meal plans to support recovery.",
                    "Involve family members in the treatment process for additional support.",
                    "Create a safe and supportive environment at home for meal times.",
                    "Develop a crisis plan for managing difficult moments or relapses.",
                ]);
            } else if (score < 80) {
                setSuggestions([
                    "Consider seeing a registered dietitian for guidance on balanced eating.",
                    "Explore therapy options, such as cognitive-behavioral therapy (CBT), to address underlying issues.",
                    "Develop healthy coping mechanisms for managing emotions without turning to food.",
                    "Surround yourself with a supportive and understanding network of friends and family.",
                    "Create structured meal plans to establish a consistent eating routine.",
                    "Keep a food diary to track eating habits and emotional triggers.",
                    "Focus on body positivity and self-acceptance rather than unrealistic ideals.",
                    "Practice mindfulness to reduce impulsive or emotional eating.",
                    "Prioritize self-care activities that nurture your emotional well-being.",
                    "Engage in social events that don't center solely on food.",
                ]);
            } else if (score <= 100) {
                setSuggestions([
                    "Focus on balanced meals with a variety of nutrients.",
                    "Stick to consistent meal and snack times to regulate eating patterns.",
                    "Practice mindful eating to savor and appreciate each bite.",
                    "Drink plenty of water throughout the day to support overall health.",
                    "Enjoy treats and indulgent foods in moderation without guilt.",
                    "Engage in regular physical activity for overall well-being.",
                    "Be kind and compassionate toward yourself regarding your eating habits.",
                    "Pay attention to emotional triggers for unhealthy eating patterns.",
                    "Reach out to friends and family for emotional support when needed.",
                    "Consult a healthcare professional or nutritionist for dietary advice.",
                ]);
            }
        }
    }, [test, score]);

    var navigate = useNavigate();
    var [finish, setFinish] = useState(false);
    var [showSpinner, setShowSpinner] = useState(false);
    return (
        <div className="Results">
            {showSpinner ? <Spinner /> : null}
            <Nav link="/tranquil/home" />
            <header>
                <h1>Your result</h1>
            </header>
            <div className="rsltcont">
                <div className="scorediv">
                    <p>{score}%</p>
                </div>
                <button
                    onClick={() => {
                        setShowSpinner(true);
                        setTimeout(() => {
                            setShowSpinner(false);
                            setFinish(true);
                        }, 1000);
                    }}
                >
                    Finish Test
                </button>
                <div className="advice">
                    <p className="brief">{brief}</p>
                    <h2>Suggestions and recommendations</h2>
                    <ul>
                        {suggestions.map((elem) => (
                            <li>{elem}</li>
                        ))}
                    </ul>
                    <p className="bestreg">
                        Keep building your mental health. The team at tranquil
                        send their best wishes
                    </p>
                </div>
            </div>
            {finish ? (
                <div className="finished">
                    <div>
                        <img src={testFinished} alt="" />
                        <h1>Welldone</h1>
                        <p>Keep taking more tests and see how you improve</p>
                        <button
                            onClick={() => {
                                navigate("/tranquil/home");
                            }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Results;
