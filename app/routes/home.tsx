import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/Navbar";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, type Key } from "react";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume with AI" },
    { name: "description", content: "Get Smart feedback fro your dream job!" },
  ];
}

export default function Home() {
    const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated]);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applictaions & Resume Ratings</h1>
          <h2>Review Your Submissions and check AI-Powered Feedback.</h2>
        </div>
           {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume: { id: Key | null | undefined; }) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
      </section>
   
    </main>
  );
}
