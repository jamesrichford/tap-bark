import { Test, Expect, SpyOn, Any, FunctionSpy, TestCase } from "alsatian";
import { TapBark } from "../../../src/tap-bark";
import { OutputBuilder } from "../../_builders/output-builder";
const parser = require("tap-parser");
let duplexer = require("duplexer");

export default class TapBarkTests {

    @Test("setup called on output")
    public setupFunctionCalledOnOutput() {

        const mockOutput = new OutputBuilder().build();

        SpyOn(mockOutput, "setup");

        const mockParser = parser();

        const tapBark = new TapBark(mockOutput, mockParser);

        Expect(mockOutput.setup).toHaveBeenCalled();
    }

    @Test("plan event handled")
    public parserPlanEventHandled() {

        const mockOutput = new OutputBuilder().build();

        const mockParser = parser();

        SpyOn(mockParser, "on");

        const tapBark = new TapBark(mockOutput, mockParser);

        Expect(mockParser.on).toHaveBeenCalledWith("plan", Any(Function));
    }

    @Test("comment event handled")
    public parserCommentEventHandled() {

        const mockOutput = new OutputBuilder().build();

        const mockParser = parser();

        SpyOn(mockParser, "on");

        const tapBark = new TapBark(mockOutput, mockParser);

        Expect(mockParser.on).toHaveBeenCalledWith("comment", Any(Function));
    }

    @Test("assert event handled")
    public parserAssertEventHandled() {

        const mockOutput = new OutputBuilder().build();

        const mockParser = parser();

        SpyOn(mockParser, "on");

        const tapBark = new TapBark(mockOutput, mockParser);

        Expect(mockParser.on).toHaveBeenCalledWith("assert", Any(Function));
    }

    @Test("complete event handled")
    public parserCompleteEventHandled() {

        const mockOutput = new OutputBuilder().build();

        const mockParser = parser();

        SpyOn(mockParser, "on");

        const tapBark = new TapBark(mockOutput, mockParser);

        Expect(mockParser.on).toHaveBeenCalledWith("complete", Any(Function));
    }

    @Test("create makes a new TapBark")
    public createReturnsInstanceOfTapBark() {

        Expect(TapBark.create() instanceof TapBark).toBe(true);
    }

    @Test("create a new TapBark instance every time")
    public createNewInstanceOfTapBarkEachCall() {

        Expect(TapBark.create()).not.toBe(TapBark.create());
    }

    @Test("create a new pipeable instance every time")
    public createNewInstanceOfPipeableEachCall() {

        const mockOutput = new OutputBuilder().build();

        const mockParser = parser();

        const tapBark = new TapBark(mockOutput, mockParser);

        Expect(tapBark.getPipeable()).not.toBe(tapBark.getPipeable());
    }

    @TestCase(1)
    @TestCase(2)
    @TestCase(42)
    public test(planEnd: number) {

        const mockOutput = new OutputBuilder().build();

        SpyOn(mockOutput, "setProgress");

        const mockParser = parser();

        SpyOn(mockParser, "on");

        const tapBark = new TapBark(mockOutput, mockParser);

        const planEventHandler = (<FunctionSpy>mockParser.on).calls
                                    .map(call => call.args)
                                    .filter(args => args[0] === "plan")[0][1];

        const assertEventHandler = (<FunctionSpy>mockParser.on).calls
                                    .map(call => call.args)
                                    .filter(args => args[0] === "assert")[0][1];

        planEventHandler({ end: planEnd });

        assertEventHandler({ id: 1 });

        Expect(mockOutput.setProgress).toHaveBeenCalledWith(1, planEnd);
    }


    // setupListeners()

    // on "plan"
    // * updates this._planEnd

    // on "comment"
    // * calls setFixtureName if starts with #Fixture and a space
    // * otherwise it doesn'this

    // on "assert"
    // test name set correctly
    // progress set correctly

    // on "exit"
    // * calls output.outputResults with
    //   - correct pass (results.pass or 0)
    //   - correct fail (results.fail or results.failures length or 0)
    //   - correct ignore (results.skip or 0 + results.todo or 0)
    //   - correct failures (results.failures)
    // * calls process.exit with 0 if results.ok === true
    // * calls process.exit with 1 if results.ok === false

}