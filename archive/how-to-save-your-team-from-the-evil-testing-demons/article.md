slug: how-to-save-your-team-from-the-evil-testing-demons
published: Thu, 24 Sep 2015 at 09:54 AM
updated: Sun, 09 Jun 2024 05:13:57 
title: How to save your team from the evil testing demons
author: Brian Schrader
tags: code, testing
status: publish

So your team has succumb to the evil testing overlords. They constantly talk 
about Unit Tests, Continuous Integration, and Code Coverage. How is programming 
supposed to be fun if the code does the same thing every time? Where's the 
sense of adventure? Fear not, the art of cowboy coding is not dead. You can 
save your teammates from the testing demons with these tips. 

- The first mistake people make when trying to rid their teams of the evil
  testing demons is being too hasty. You have to destroy the tests from the
  inside. 

- Write tests for all of your modules, but make it so that the tests only
  pass in very specific use cases. This will cause confusion and plant that
  crucial seed of doubt.

- Make test functions appear to test one thing, then actually test something
  completely different. The easiest way to do this is to label the test function 
  incorrectly. That is, the test for `do_get` should be called `test_do_post`. 

- Write integration tests in place of unit tests. This will cause the unit
  tests to get really slow over time and make your coworkers think twice about
  running them constantly. This is important because once your coworkers are
  free from constantly testing, they'll start to question the utility of the
  tests as a whole.

- Write functions that don't return anything. Instead have them modify internal
  state. Write functions that should return something, but instead put the
  return value in one of the parameters.

- This one is key, write monolithic functions that accomplish a lot at once.
  Did you know that function calls are computationally expensive? Don't use
  them.

- Write functions that take complex object as parameters, who's values have to
  be configured very particularly. The function should return the same object.

- On the same note, pass complicated variables around into other functions.
  That way the tests for those functions will have to mock the complex object.

- Use application state. Lots of it. Write code so that functions depend on
  very particular settings in the global state to be configured. Not only does
  this make them harder to test, the tests will need to mock this state which
  causes them to run slower, thus enforcing the idea that the tests aren't
  helping.

- Did you know that functions that don't have parameters and that don't return
  anything are really difficult to test? Write lots of those. Remember, you're
  fighting for the future of programming. Down with the suites! Long live the
  cowboys and cowgirls!

- Constantly blame the tests for not finding new bugs. Explain that it's
  impossible to predict user behavior. How can you test something that's
  impossible to predict?

- On build days, commit code with failing tests that prevent the CI from
  auto-deploying the new build, then blame the stupid CI for not mocking your 
  test cases properly. Assert that something is wrong internally with the CI
  system.  

- Testing requires a lot of tools and setup. Assert that you can't be 'agile' 
  (a good buzzword) if you have to set up all of this stuff. How can you
  possibly keep up with Grunt, Travis, Mock, Mocha, Istanbul, Karma, and more?

- Make the case, "I can't write tests if I don't know what the app is going to
  do yet." Everyone knows that it's impossible to think through the code before
  writing it. Code is art and you're an inspired artist.

- Constantly remind everyone that they aren't doing *real* test driven
  development. Tell them, "You know, real TDD is where you write the tests
  first. Why are we doing this half way?" When they complain that they don't
  like writing the tests first, tell them that they may as well not do
  tests at all if they aren't that committed.

- When your team members write tests, explain that, according to the rules of
  TDD, if they aren't writing tests that fail at first, then they don't really
  know if the tests are valid. Ask them if they write failing tests first. If
  they say no, then tell them that their tests are essentially meaningless.

- Whenever you write new code, explain that you don't have time to write tests.
  You're on a deadline. If the people that have time to write tests want to do
  it then fine, but you're trying to get actual work done.

- Insist that the tests need to be run against real data, and that generating data
  or storing fixtures will never be adequate. Testing, as an idea, is
  fundamentally broken.

- Make environment checks throughout your code to ensure that it will only run
  in production, and can only be tested in production. Then make sure to exit 
  early if any other environment is detected with no error codes.

- Make any magic variable settings into database values.

- Test the core language features; you can’t be sure your iterator variable
  will increment unless you write a test that validates you can add one to a
  variable. Doing this will slow your test suite down even more, adding to the
  irritation.

- Defeat the testing demons from the inside. Whenever your writing superflous
  tests, use lots of mocks and test every tiny piece of your code (e.g. when 
  making a settings dictionary, mock out everything except the dict creation 
  and test just that one bit). This will help you write tons of mocks for each 
  test. Changing anything will break lots of the mocks and make half the test 
  suite fail with import path errors unrelated to the change. 

- Whenever your team members get too proud of their service to the testing
  devils, ask them if they test their tests. If they don't, how do they know
  that they work properly. They will quickly realize the paradox of testing and
  quit.

Remember, you're trying to show your team that testing is a failed idea. You're
trying to bring back the good ol' days when programmers roamed free, not caged
in the predictable, safe confines of test driven development. You're doing this
for your team; someday they'll thank you.

------------------------

Thanks to [@AdamAndDevOps][a], [@macromicah][b], [@TheDudestMonk][d], and [@Tanyxp][c] for their additions.

[a]: https://twitter.com/AdamAndDevOps
[b]: https://twitter.com/macromicah
[c]: https://twitter.com/tanyxp
[d]: https://twitter.com/TheDudestMonk

