https://pastebin.contextarea.com/eTIvfqS.md

create an RFC for the markdown structure for hierarchical markdown format using blockquote nesting to represent recursive execution flows. ensure it demonstrates all the different places in which this can be used

its important to note that the highest level can also be denoted using # Headers for markdown readability. it's also important to note that this doesn't require workflows to be carried out in sequence. the workflow should be structured in a way that if it iscarried out in sequence it will be completely fine, but if the engine has information about dependencies it may choose to start certain parts of the workflow earlier. however, a deeplynested tool can never be called before the outer tool was called.

it is also important to incorporate the thought behind it. the idea is that we can create natural language representation of nested logic gates that are workers, agents, or humans, where there can be different, completely independent systems (aka micro services) that take care of a small part of the entire workflow

please define

- abstract
- motivation
- specification and implementation notes
- examples of different hierarchical agents
- examples of different ways of using this format (streaming agentic execution, showing hierarchical workflow status, simple way of showing nested structured tools for agents, simple way of showing nested flow in natural language)
- key benefits
