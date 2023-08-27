import React, { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { TiStarOutline } from "react-icons/ti";
import { BsCheck2Circle } from "react-icons/bs";
import { DbProblem, Problem } from "@/utils/types/problem";
import { auth, firestore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { problems } from "@/utils/problems";

type ProblemDescriptionProps = {
  problem: Problem;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const { currentProblem, loading, problemDifficultyClass } =
    useGetCurrentProblem(problem.id);
  return (
    <div className="bg-dark-layer-1">
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <h1
          className={
            "bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
          }
        >
          Description
        </h1>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          <div className="w-full">
            <div className="flex space-x-4">
              <h2 className="flex-1 mr-2 text-lg text-white font-medium">
                {problem.title}
              </h2>
            </div>

            {!loading && currentProblem && (
              <div className="flex items-center mt-3">
                <span
                  className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                >
                  {currentProblem.difficulty}
                </span>
                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                  <BsCheck2Circle />
                </div>
                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                  <AiFillLike />
                  <span className="text-xs">{currentProblem.likes}</span>
                </div>
                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6">
                  <AiFillDislike />
                  <span className="text-xs">{currentProblem.dislikes}</span>
                </div>
                <div className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 ">
                  <TiStarOutline />
                </div>
              </div>
            )}

            <div
              className="text-white text-sm"
              dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
            />

            <div className="mt-4">
              {problem.examples.map((example, index) => (
                <div key={example.id}>
                  <p className="font-medium text-white ">
                    Example {index + 1}:{" "}
                  </p>
                  {example.img && (
                    <img src={example.img} alt="/" className="mt-3" />
                  )}
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>
                      {example.inputText}
                      <br />
                      <strong>Output:</strong> {example.outputText} <br />
                      {example.explanation && (
                        <>
                          <strong>Explanation:</strong>
                          {example.explanation}
                        </>
                      )}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-5">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul
                className="text-white ml-5 list-disc"
                dangerouslySetInnerHTML={{ __html: problem.constraints }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<DbProblem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [problemDifficultyClass, setProblemDifficultyClass] =
    useState<string>("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const docRef = doc(firestore, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem } as DbProblem);
        setProblemDifficultyClass(
          problem.difficulty === "Easy"
            ? "bg-olive text-olive"
            : problem.difficulty === "Medium"
            ? "bg-dark-yellow text-dark-yellow"
            : "bg-dark-pink text-dark-pink"
        );
        setLoading(false);
      }
    })();
  }, [problemId]);

  return { loading, currentProblem, problemDifficultyClass };
}

function useGetUsersDataOnProblem(problemId: string) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function getUsersDataOnProblem() {
      const userRef = doc(firestore, "users", user!.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const {
          solvedProblem,
          likedProblem,
          dislikedProblems,
          starredProblems,
        } = data;
        setData({
          liked: likedProblem.includes(problemId),
          solved: solvedProblem.includes(problemId),
          disliked: dislikedProblems.includes(problemId),
          starred: starredProblems.includes(problemId),
        });
      }
    }

    if (user) getUsersDataOnProblem();
    return () => {
      setData({
        liked: false,
        disliked: false,
        starred: false,
        solved: false,
      });
    };
  }, [problemId, user]);

  return { ...data, setData };
}
