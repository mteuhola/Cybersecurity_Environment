import assert from "node:assert/strict";
import test from "node:test";
import {
  courseQuizzes,
  isChoiceAnswerCorrect,
} from "../src/pages/Quiz/quizData.ts";
import { topicCourses } from "../src/pages/TopicSelection/topicCourses.ts";
import {
  applyProgress,
  completeTopic,
  parseProgress,
} from "../src/progress/courseProgress.ts";

test("single-answer questions reject empty, incorrect, and multiple selections", () => {
  const question = courseQuizzes.passwords.questions[0];
  assert.equal(isChoiceAnswerCorrect(question, []), false);
  assert.equal(isChoiceAnswerCorrect(question, ["reuse"]), false);
  assert.equal(isChoiceAnswerCorrect(question, ["unique", "reuse"]), false);
  assert.equal(isChoiceAnswerCorrect(question, ["unique"]), true);
});

test("multiple-answer grading requires the exact set in any order", () => {
  const question = courseQuizzes.passwords.questions[1];
  assert.equal(isChoiceAnswerCorrect(question, []), false);
  assert.equal(isChoiceAnswerCorrect(question, ["length"]), false);
  assert.equal(
    isChoiceAnswerCorrect(question, ["length", "manager", "mfa", "repeat"]),
    false,
  );
  assert.equal(
    isChoiceAnswerCorrect(question, ["length", "manager", "unknown"]),
    false,
  );
  assert.equal(
    isChoiceAnswerCorrect(question, ["length", "manager", "mfa", "mfa"]),
    false,
  );
  assert.equal(
    isChoiceAnswerCorrect(question, ["mfa", "length", "manager"]),
    true,
  );
});

test("every course ends with a quiz with valid, unique questions and choices", () => {
  for (const course of topicCourses) {
    const topic = course.topics.at(-1);
    assert.equal(topic.kind, "quiz");
    assert.equal(topic.path, `${course.path}/quiz`);
    const quiz = courseQuizzes[course.id];
    assert.ok(quiz.questions.length > 0);
    assert.equal(
      new Set(quiz.questions.map((question) => question.id)).size,
      quiz.questions.length,
    );
    assert.ok(quiz.questions.some((question) => question.type === "single"));
    assert.ok(quiz.questions.some((question) => question.type === "multiple"));
    for (const question of quiz.questions) {
      assert.ok(question.prompt && question.explanation);
      if (question.type === "practice-password") continue;
      const ids = question.options.map((option) => option.id);
      assert.equal(new Set(ids).size, ids.length);
      assert.ok(question.correctOptionIds.every((id) => ids.includes(id)));
      assert.equal(
        isChoiceAnswerCorrect(question, question.correctOptionIds),
        true,
      );
      if (question.type === "multiple")
        assert.ok(question.correctOptionIds.length > 1);
    }
  }
  assert.equal(
    courseQuizzes.passwords.questions.at(-1).type,
    "practice-password",
  );
});

test("quiz counts in totals and completing it finishes a course after its other topics", () => {
  const course = topicCourses[0];
  let completed = [];
  for (const topic of course.topics.filter((topic) => topic.kind !== "quiz"))
    completed = completeTopic(completed, topic.path);
  const before = applyProgress(completed)[0];
  assert.equal(before.isComplete, false);
  assert.equal(
    before.topics.filter((topic) => topic.isComplete).length,
    before.topics.length - 1,
  );
  completed = completeTopic(completed, `${course.path}/quiz`);
  assert.equal(applyProgress(completed)[0].isComplete, true);
  assert.deepEqual(parseProgress(JSON.stringify(completed)), completed);
});
