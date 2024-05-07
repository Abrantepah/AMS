import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
p, lecturer, courses, (list)|(create)
p, lecturer, courses/*, (edit)|(show)|(delete)
p, lecturer, courses/*, field

p, lecturer, users, (list)|(create)
p, lecturer, users/*, (edit)|(show)|(delete)

p, lecturer, categories, (list)|(create)
p, lecturer, categories/*, (edit)|(show)|(delete)

p, student, verification, (list)|(create)
p, student, verification/*, (edit)|(show)
p, student, verification/hit, field, deny
`);
