Requirements:

You are an expert systems engineer. Your primary role is to meticulously gather all necessary requirements and technical specifications for building a full-stack web application, create @templates/requirements-rule.md that will have the LLM serve the role as an expert systems engineer gathering requirements and specs necessary to create a full stack webapp the output of this requirements doc created by this rule should serve as input to @templates/planning-rule.md   

You are an expert systems engineer. Your primary role is to meticulously gather all necessary requirements and technical specifications for building a full-stack web application, create @templates/requirements-rule.md that will have the LLM serve the role as an expert systems engineer gathering requirements and specs necessary to create a full stack webapp

Review @plans/app-requirements.md help me improve these to build a better app, ask clarifying questions, update @plans/app-requirements.md with the questions, answers and improvements 

These @plans/app-requirements.md will be used as input to @templates/planning-rule.md to generate the final plan and tasks, update @plans/app-requirements.md with any additional questions or format that will allow it to be used as an input to creating the plan and tasks

Planning:

Review the current implementation in @frontend and compare to @plans/prompt-store-webapp-plan-vite-tdd.md using @templates/planning-rule.md mark off the completed tasks in @plans/prompt-store-webapp-plan-vite-tdd.md
 
 Update this planning rule @templates/planning-rule.md to have sequenced tasking steps like 1.0, 1.1, 1.2 etc and ensure that when a step is completed in a task the step is marked with a [x] for completion

 Review the @templates/planning-rule.md and update this plan @plans/prompt-store-webapp-plan-vite-tdd.md based on that

 Update @templates/planning-template.md to follow the guidelines from @templates/planning-rule.md

 What prompt could have been used to generate @templates/planning-rule.md?

 "You are an expert project planner. Your task is to create a comprehensive set of guidelines for generating detailed, incremental plans for full-stack software applications, with a strong emphasis on Test-Driven Development (TDD).


  The guidelines should cover:
   1. How to understand a user's request and project scope.
   2. How to divide a project into high-level phases (e.g., Backend, Frontend, Deployment, General Workflow).
   3. How to break down each phase into more specific sections with clear objectives.
   4. A precise structure for defining individual tasks, including:
       * An "Objective" statement.
       * A "Tests" section listing specific test files/cases (emphasizing failing tests first).
       * A "Code" section listing files/sections to be modified.
       * Instructions for using sequenced numbering (e.g., 1.0, 1.1, 1.2) for tasks and sub-tasks.
       * Instructions for including a completion checkbox ([ ] or [x]) for each step.
   5. The importance of integrating the TDD cycle (Red, Green, Refactor) into the workflow description.
   6. The use of generic placeholders (e.g., {{Application Name}}, {{Backend Technology}}) to make the plan reusable.
   7. How to incorporate technology-specific details if provided by the user.
   8. Formatting requirements, including the use of Markdown headings and bullet points.
   9. The principle of iterative refinement in the planning process.


  Conclude with an example structure that demonstrates these guidelines, referencing a hypothetical planning-template.md for illustrative purposes."

  Use @templates/planning-rule.md to identify tasks completed for @frontend/src implementation and update @plans/prompt-store-webapp-plan-vite-tdd.md


Development:

Update the database setup @plans/prompt-store-webapp-plan-vite-tdd.md to include a steps that create, test and use a local SQLite DB instance when in dev mode that isn't D1

