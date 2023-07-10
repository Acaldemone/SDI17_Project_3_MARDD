import React, { useState } from "react";

export default function EvaluationForm() {
  const [rateeRole, setRateeRole] = useState("");
  const [workPerformanceRating, setWorkPerformanceRating] = useState("");
  const [workPerformanceComments, setWorkPerformanceComments] = useState("");
  const [followershipLeadershipRating, setFollowershipLeadershipRating] = useState("");
  const [followershipLeadershipComments, setFollowershipLeadershipComments] = useState("");
  const [professionalDevelopmentRating, setProfessionalDevelopmentRating] = useState("");
  const [professionalDevelopmentComments, setProfessionalDevelopmentComments] = useState("");
  const [fitness, setFitness] = useState("");
  const [fitnessComments, setFitnessComments] = useState("");
  const [lastEvalDate, setLastEvalDate] = useState("");
  const [userId, setUserId] = useState("");
  const [supervisorId, setSupervisorId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      ratee_role: rateeRole,
      work_performance_rating: workPerformanceRating,
      work_performance_comments: workPerformanceComments,
      followership_leadership_rating: followershipLeadershipRating,
      followership_leadership_comments: followershipLeadershipComments,
      professional_development_rating: professionalDevelopmentRating,
      professional_development_comments: professionalDevelopmentComments,
      fitness: fitness,
      fitness_comments: fitnessComments,
      last_eval_date: lastEvalDate,
      user_id: userId,
      supervisor_id: supervisorId,
    };

    const response = fetch(`http://localhost:8080/evals`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      alert('Evaluation has been submitted.');
    } else {
      alert('Error submitting evaluation.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="ratee_role"
        placeholder="Enter ratee role"
        value={rateeRole}
        onChange={(event) => setRateeRole(event.target.value)}
      />
      <input
        type="text"
        name="work_performance_rating"
        placeholder="Enter work performance rating"
        value={workPerformanceRating}
        onChange={(event) => setWorkPerformanceRating(event.target.value)}
      />
      <input
        type="text"
        name="work_performance_comments"
        placeholder="Enter work performance comments"
        value={workPerformanceComments}
        onChange={(event) => setWorkPerformanceComments(event.target.value)}
      />
      <input
        type="text"
        name="followership_leadership_rating"
        placeholder="Enter followership / leadership rating"
        value={followershipLeadershipRating}
        onChange={(event) => setFollowershipLeadershipRating(event.target.value)}
      />
      <input
        type="text"
        name="followership_leadership_comments"
        placeholder="Enter followership / leadership comments"
        value={followershipLeadershipComments}
        onChange={(event) => setFollowershipLeadershipComments(event.target.value)}
      />
      <input
        type="text"
        name="professional_development_rating"
        placeholder="Enter professional development rating"
        value={professionalDevelopmentRating}
        onChange={(event) => setProfessionalDevelopmentRating(event.target.value)}
      />
      <input
        type="text"
        name="professional_development_comments"
        placeholder="Enter professional development comments"
        value={professionalDevelopmentComments}
        onChange={(event) => setProfessionalDevelopmentComments(event.target.value)}
      />
      <input
        type="text"
        name="fitness"
        placeholder="Enter fitness"
        value={fitness}
        onChange={(event) => setFitness(event.target.value)}
      />
      <input
      type="text"
      name="fitness_comments"
      placeholder="Enter fitness comments"
      value={fitnessComments}
      onChange={(event) => setFitnessComments(event.target.value)}
      />
      <input
      type="text"
      name="last_eval_date"
      placeholder="Enter last eval date"
      value={lastEvalDate}
      onChange={(event) => setLastEvalDate(event.target.value)}
      />
      <input
      type="text"
      name="user_id"
      placeholder="Enter user id"
      value={userId}
      onChange={(event) => setUserId(event.target.value)}
      />
      <input
      type="text"
      name="supervisor_id"
      placeholder="Enter supervisor id"
      value={supervisorId}
      onChange={(event) => setSupervisorId(event.target.value)}
      />
      <button type="Submit">Submit</button>
      </form>
    )}

