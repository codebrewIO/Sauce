namespace java io.codebrew.api.eval

enum Severity { INFO, WARNING, ERROR }

struct CompilationInfo {
	1: string message,
	2: i32 pos,
	3: Severity severity
}

struct Instrumentation {
	1: i32 line,
	2: string result
}

struct Result {
	1: optional list<Instrumentation> insight
	2: list<CompilationInfo> infos,
	3: bool timeout
}

struct Completion {
    1: string name,
    2: string signature
}

service Eval {
	Result insight(1: string code),
	list<Completion> autocomplete(1: string code, 2: i32 pos)
}