export const htmlSyntax = {
  "information_for_contributors": [
    "This file has been converted from https://github.com/textmate/html.tmbundle/blob/master/Syntaxes/HTML.plist",
    "If you want to provide a fix or improvement, please create a pull request against the original repository.",
    "Once accepted there, we are happy to receive an update request."
  ],
  "version": "https://github.com/textmate/html.tmbundle/commit/0c3d5ee54de3a993f747f54186b73a4d2d3c44a2",
  "name": "HTML",
  "scopeName": "text.html.basic",
  "injections": {
    "R:text.html - (comment.block, text.html meta.embedded, meta.tag.*.*.html, meta.tag.*.*.*.html, meta.tag.*.*.*.*.html)": {
      "comment": "Uses R: to ensure this matches after any other injections.",
      "patterns": [
        {
          "match": "<",
          "name": "invalid.illegal.bad-angle-bracket.html"
        }
      ]
    }
  },
  "patterns": [
    {
      "include": "#xml-processing"
    },
    {
      "include": "#comment"
    },
    {
      "include": "#doctype"
    },
    {
      "include": "#cdata"
    },
    {
      "include": "#tags-valid"
    },
    {
      "include": "#tags-invalid"
    },
    {
      "include": "#entities"
    }
  ],
  "repository": {
    "attribute": {
      "patterns": [
        {
          "begin": "(s(hape|cope|t(ep|art)|ize(s)?|p(ellcheck|an)|elected|lot|andbox|rc(set|doc|lang)?)|h(ttp-equiv|i(dden|gh)|e(ight|aders)|ref(lang)?)|n(o(nce|validate|module)|ame)|c(h(ecked|arset)|ite|o(nt(ent(editable)?|rols)|ords|l(s(pan)?|or))|lass|rossorigin)|t(ype(mustmatch)?|itle|a(rget|bindex)|ranslate)|i(s(map)?|n(tegrity|putmode)|tem(scope|type|id|prop|ref)|d)|op(timum|en)|d(i(sabled|r(name)?)|ownload|e(coding|f(er|ault))|at(etime|a)|raggable)|usemap|p(ing|oster|la(ysinline|ceholder)|attern|reload)|enctype|value|kind|for(m(novalidate|target|enctype|action|method)?)?|w(idth|rap)|l(ist|o(op|w)|a(ng|bel))|a(s(ync)?|c(ce(sskey|pt(-charset)?)|tion)|uto(c(omplete|apitalize)|play|focus)|l(t|low(usermedia|paymentrequest|fullscreen))|bbr)|r(ows(pan)?|e(versed|quired|ferrerpolicy|l|adonly))|m(in(length)?|u(ted|ltiple)|e(thod|dia)|a(nifest|x(length)?)))(?![\\w:-])",
          "beginCaptures": {
            "0": {
              "name": "entity.other.attribute-name.html"
            }
          },
          "comment": "HTML5 attributes, not event handlers",
          "end": "(?=\\s*+[^=\\s])",
          "name": "meta.attribute.$1.html",
          "patterns": [
            {
              "include": "#attribute-interior"
            }
          ]
        },
        {
          "begin": "style(?![\\w:-])",
          "beginCaptures": {
            "0": {
              "name": "entity.other.attribute-name.html"
            }
          },
          "comment": "HTML5 style attribute",
          "end": "(?=\\s*+[^=\\s])",
          "name": "meta.attribute.style.html",
          "patterns": [
            {
              "begin": "=",
              "beginCaptures": {
                "0": {
                  "name": "punctuation.separator.key-value.html"
                }
              },
              "end": "(?<=[^\\s=])(?!\\s*=)|(?=/?>)",
              "patterns": [
                {
                  "begin": "(?=[^\\s=<>`/]|/(?!>))",
                  "end": "(?!\\G)",
                  "name": "meta.embedded.line.css",
                  "patterns": [
                    {
                      "captures": {
                        "0": {
                          "name": "source.css"
                        }
                      },
                      "match": "([^\\s\"'=<>`/]|/(?!>))+",
                      "name": "string.unquoted.html"
                    },
                    {
                      "begin": "\"",
                      "beginCaptures": {
                        "0": {
                          "name": "punctuation.definition.string.begin.html"
                        }
                      },
                      "contentName": "source.css",
                      "end": "(\")",
                      "endCaptures": {
                        "0": {
                          "name": "punctuation.definition.string.end.html"
                        },
                        "1": {
                          "name": "source.css"
                        }
                      },
                      "name": "string.quoted.double.html",
                      "patterns": [
                        {
                          "include": "#entities"
                        }
                      ]
                    },
                    {
                      "begin": "'",
                      "beginCaptures": {
                        "0": {
                          "name": "punctuation.definition.string.begin.html"
                        }
                      },
                      "contentName": "source.css",
                      "end": "(')",
                      "endCaptures": {
                        "0": {
                          "name": "punctuation.definition.string.end.html"
                        },
                        "1": {
                          "name": "source.css"
                        }
                      },
                      "name": "string.quoted.single.html",
                      "patterns": [
                        {
                          "include": "#entities"
                        }
                      ]
                    }
                  ]
                },
                {
                  "match": "=",
                  "name": "invalid.illegal.unexpected-equals-sign.html"
                }
              ]
            }
          ]
        },
        {
          "begin": "on(s(croll|t(orage|alled)|u(spend|bmit)|e(curitypolicyviolation|ek(ing|ed)|lect))|hashchange|c(hange|o(ntextmenu|py)|u(t|echange)|l(ick|ose)|an(cel|play(through)?))|t(imeupdate|oggle)|in(put|valid)|o(nline|ffline)|d(urationchange|r(op|ag(start|over|e(n(ter|d)|xit)|leave)?)|blclick)|un(handledrejection|load)|p(opstate|lay(ing)?|a(ste|use|ge(show|hide))|rogress)|e(nded|rror|mptied)|volumechange|key(down|up|press)|focus|w(heel|aiting)|l(oad(start|e(nd|d(data|metadata)))?|anguagechange)|a(uxclick|fterprint|bort)|r(e(s(ize|et)|jectionhandled)|atechange)|m(ouse(o(ut|ver)|down|up|enter|leave|move)|essage(error)?)|b(efore(unload|print)|lur))(?![\\w:-])",
          "beginCaptures": {
            "0": {
              "name": "entity.other.attribute-name.html"
            }
          },
          "comment": "HTML5 attributes, event handlers",
          "end": "(?=\\s*+[^=\\s])",
          "name": "meta.attribute.event-handler.$1.html",
          "patterns": [
            {
              "begin": "=",
              "beginCaptures": {
                "0": {
                  "name": "punctuation.separator.key-value.html"
                }
              },
              "end": "(?<=[^\\s=])(?!\\s*=)|(?=/?>)",
              "patterns": [
                {
                  "begin": "(?=[^\\s=<>`/]|/(?!>))",
                  "end": "(?!\\G)",
                  "name": "meta.embedded.line.js",
                  "patterns": [
                    {
                      "captures": {
                        "0": {
                          "name": "source.js"
                        },
                        "1": {
                          "patterns": [
                            {
                              "include": "source.js"
                            }
                          ]
                        }
                      },
                      "match": "(([^\\s\"'=<>`/]|/(?!>))+)",
                      "name": "string.unquoted.html"
                    },
                    {
                      "begin": "\"",
                      "beginCaptures": {
                        "0": {
                          "name": "punctuation.definition.string.begin.html"
                        }
                      },
                      "contentName": "source.js",
                      "end": "(\")",
                      "endCaptures": {
                        "0": {
                          "name": "punctuation.definition.string.end.html"
                        },
                        "1": {
                          "name": "source.js"
                        }
                      },
                      "name": "string.quoted.double.html",
                      "patterns": [
                        {
                          "captures": {
                            "0": {
                              "patterns": [
                                {
                                  "include": "source.js"
                                }
                              ]
                            }
                          },
                          "match": "([^\\n\"/]|/(?![/*]))+"
                        },
                        {
                          "begin": "//",
                          "beginCaptures": {
                            "0": {
                              "name": "punctuation.definition.comment.js"
                            }
                          },
                          "end": "(?=\")|\\n",
                          "name": "comment.line.double-slash.js"
                        },
                        {
                          "begin": "/\\*",
                          "beginCaptures": {
                            "0": {
                              "name": "punctuation.definition.comment.begin.js"
                            }
                          },
                          "end": "(?=\")|\\*/",
                          "endCaptures": {
                            "0": {
                              "name": "punctuation.definition.comment.end.js"
                            }
                          },
                          "name": "comment.block.js"
                        }
                      ]
                    },
                    {
                      "begin": "'",
                      "beginCaptures": {
                        "0": {
                          "name": "punctuation.definition.string.begin.html"
                        }
                      },
                      "contentName": "source.js",
                      "end": "(')",
                      "endCaptures": {
                        "0": {
                          "name": "punctuation.definition.string.end.html"
                        },
                        "1": {
                          "name": "source.js"
                        }
                      },
                      "name": "string.quoted.single.html",
                      "patterns": [
                        {
                          "captures": {
                            "0": {
                              "patterns": [
                                {
                                  "include": "source.js"
                                }
                              ]
                            }
                          },
                          "match": "([^\\n'/]|/(?![/*]))+"
                        },
                        {
                          "begin": "//",
                          "beginCaptures": {
                            "0": {
                              "name": "punctuation.definition.comment.js"
                            }
                          },
                          "end": "(?=')|\\n",
                          "name": "comment.line.double-slash.js"
                        },
                        {
                          "begin": "/\\*",
                          "beginCaptures": {
                            "0": {
                              "name": "punctuation.definition.comment.begin.js"
                            }
                          },
                          "end": "(?=')|\\*/",
                          "endCaptures": {
                            "0": {
                              "name": "punctuation.definition.comment.end.js"
                            }
                          },
                          "name": "comment.block.js"
                        }
                      ]
                    }
                  ]
                },
                {
                  "match": "=",
                  "name": "invalid.illegal.unexpected-equals-sign.html"
                }
              ]
            }
          ]
        },
        {
          "begin": "(data-[a-z\\-]+)(?![\\w:-])",
          "beginCaptures": {
            "0": {
              "name": "entity.other.attribute-name.html"
            }
          },
          "comment": "HTML5 attributes, data-*",
          "end": "(?=\\s*+[^=\\s])",
          "name": "meta.attribute.data-x.$1.html",
          "patterns": [
            {
              "include": "#attribute-interior"
            }
          ]
        },
        {
          "begin": "(align|bgcolor|border)(?![\\w:-])",
          "beginCaptures": {
            "0": {
              "name": "invalid.deprecated.entity.other.attribute-name.html"
            }
          },
          "comment": "HTML attributes, deprecated",
          "end": "(?=\\s*+[^=\\s])",
          "name": "meta.attribute.$1.html",
          "patterns": [
            {
              "include": "#attribute-interior"
            }
          ]
        },
        {
          "begin": "([^\\x{0020}\"'<>/=\\x{0000}-\\x{001F}\\x{007F}-\\x{009F}\\x{FDD0}-\\x{FDEF}\\x{FFFE}\\x{FFFF}\\x{1FFFE}\\x{1FFFF}\\x{2FFFE}\\x{2FFFF}\\x{3FFFE}\\x{3FFFF}\\x{4FFFE}\\x{4FFFF}\\x{5FFFE}\\x{5FFFF}\\x{6FFFE}\\x{6FFFF}\\x{7FFFE}\\x{7FFFF}\\x{8FFFE}\\x{8FFFF}\\x{9FFFE}\\x{9FFFF}\\x{AFFFE}\\x{AFFFF}\\x{BFFFE}\\x{BFFFF}\\x{CFFFE}\\x{CFFFF}\\x{DFFFE}\\x{DFFFF}\\x{EFFFE}\\x{EFFFF}\\x{FFFFE}\\x{FFFFF}\\x{10FFFE}\\x{10FFFF}]+)",
          "beginCaptures": {
            "0": {
              "name": "entity.other.attribute-name.html"
            }
          },
          "comment": "Anything else that is valid",
          "end": "(?=\\s*+[^=\\s])",
          "name": "meta.attribute.unrecognized.$1.html",
          "patterns": [
            {
              "include": "#attribute-interior"
            }
          ]
        },
        {
          "match": "[^\\s>]+",
          "name": "invalid.illegal.character-not-allowed-here.html"
        }
      ]
    },
    "attribute-interior": {
      "patterns": [
        {
          "begin": "=",
          "beginCaptures": {
            "0": {
              "name": "punctuation.separator.key-value.html"
            }
          },
          "end": "(?<=[^\\s=])(?!\\s*=)|(?=/?>)",
          "patterns": [
            {
              "match": "([^\\s\"'=<>`/]|/(?!>))+",
              "name": "string.unquoted.html"
            },
            {
              "begin": "\"",
              "beginCaptures": {
                "0": {
                  "name": "punctuation.definition.string.begin.html"
                }
              },
              "end": "\"",
              "endCaptures": {
                "0": {
                  "name": "punctuation.definition.string.end.html"
                }
              },
              "name": "string.quoted.double.html",
              "patterns": [
                {
                  "include": "#entities"
                }
              ]
            },
            {
              "begin": "'",
              "beginCaptures": {
                "0": {
                  "name": "punctuation.definition.string.begin.html"
                }
              },
              "end": "'",
              "endCaptures": {
                "0": {
                  "name": "punctuation.definition.string.end.html"
                }
              },
              "name": "string.quoted.single.html",
              "patterns": [
                {
                  "include": "#entities"
                }
              ]
            },
            {
              "match": "=",
              "name": "invalid.illegal.unexpected-equals-sign.html"
            }
          ]
        }
      ]
    },
    "cdata": {
      "begin": "<!\\[CDATA\\[",
      "beginCaptures": {
        "0": {
          "name": "punctuation.definition.tag.begin.html"
        }
      },
      "contentName": "string.other.inline-data.html",
      "end": "]]>",
      "endCaptures": {
        "0": {
          "name": "punctuation.definition.tag.end.html"
        }
      },
      "name": "meta.tag.metadata.cdata.html"
    },
    "comment": {
      "begin": "<!--",
      "captures": {
        "0": {
          "name": "punctuation.definition.comment.html"
        }
      },
      "end": "-->",
      "name": "comment.block.html",
      "patterns": [
        {
          "match": "\\G-?>",
          "name": "invalid.illegal.characters-not-allowed-here.html"
        },
        {
          "match": "<!--(?!>)|<!-(?=-->)",
          "name": "invalid.illegal.characters-not-allowed-here.html"
        },
        {
          "match": "--!>",
          "name": "invalid.illegal.characters-not-allowed-here.html"
        }
      ]
    },
    "core-minus-invalid": {
      "comment": "This should be the root pattern array includes minus #tags-invalid",
      "patterns": [
        {
          "include": "#xml-processing"
        },
        {
          "include": "#comment"
        },
        {
          "include": "#doctype"
        },
        {
          "include": "#cdata"
        },
        {
          "include": "#tags-valid"
        },
        {
          "include": "#entities"
        }
      ]
    },
    "doctype": {
      "begin": "<!(?=(?i:DOCTYPE\\s))",
      "beginCaptures": {
        "0": {
          "name": "punctuation.definition.tag.begin.html"
        }
      },
      "end": ">",
      "endCaptures": {
        "0": {
          "name": "punctuation.definition.tag.end.html"
        }
      },
      "name": "meta.tag.metadata.doctype.html",
      "patterns": [
        {
          "match": "\\G(?i:DOCTYPE)",
          "name": "entity.name.tag.html"
        },
        {
          "begin": "\"",
          "end": "\"",
          "name": "string.quoted.double.html"
        },
        {
          "match": "[^\\s>]+",
          "name": "entity.other.attribute-name.html"
        }
      ]
    },
    "entities": {
      "patterns": [
        {
          "captures": {
            "1": {
              "name": "punctuation.definition.entity.html"
            },
            "912": {
              "name": "punctuation.definition.entity.html"
            }
          },
          "comment": "Yes this is a bit ridiculous, there are quite a lot of these",
          "match": "(?x)\n\t\t\t\t\t\t(&)\t(?=[a-zA-Z])\n\t\t\t\t\t\t(\n\t\t\t\t\t\t\t(a(s(ymp(eq)?|cr|t)|n(d(slope|d|v|and)?|g(s(t|ph)|zarr|e|le|rt(vb(d)?)?|msd(a(h|c|d|e|f|a|g|b))?)?)|c(y|irc|d|ute|E)?|tilde|o(pf|gon)|uml|p(id|os|prox(eq)?|e|E|acir)?|elig|f(r)?|w(conint|int)|l(pha|e(ph|fsym))|acute|ring|grave|m(p|a(cr|lg))|breve)|A(s(sign|cr)|nd|MP|c(y|irc)|tilde|o(pf|gon)|uml|pplyFunction|fr|Elig|lpha|acute|ring|grave|macr|breve))\n\t\t\t\t\t\t  | (B(scr|cy|opf|umpeq|e(cause|ta|rnoullis)|fr|a(ckslash|r(v|wed))|reve)|b(s(cr|im(e)?|ol(hsub|b)?|emi)|n(ot|e(quiv)?)|c(y|ong)|ig(s(tar|qcup)|c(irc|up|ap)|triangle(down|up)|o(times|dot|plus)|uplus|vee|wedge)|o(t(tom)?|pf|wtie|x(h(d|u|D|U)?|times|H(d|u|D|U)?|d(R|l|r|L)|u(R|l|r|L)|plus|D(R|l|r|L)|v(R|h|H|l|r|L)?|U(R|l|r|L)|V(R|h|H|l|r|L)?|minus|box))|Not|dquo|u(ll(et)?|mp(e(q)?|E)?)|prime|e(caus(e)?|t(h|ween|a)|psi|rnou|mptyv)|karow|fr|l(ock|k(1(2|4)|34)|a(nk|ck(square|triangle(down|left|right)?|lozenge)))|a(ck(sim(eq)?|cong|prime|epsilon)|r(vee|wed(ge)?))|r(eve|vbar)|brk(tbrk)?))\n\t\t\t\t\t\t  | (c(s(cr|u(p(e)?|b(e)?))|h(cy|i|eck(mark)?)|ylcty|c(irc|ups(sm)?|edil|a(ps|ron))|tdot|ir(scir|c(eq|le(d(R|circ|S|dash|ast)|arrow(left|right)))?|e|fnint|E|mid)?|o(n(int|g(dot)?)|p(y(sr)?|f|rod)|lon(e(q)?)?|m(p(fn|le(xes|ment))?|ma(t)?))|dot|u(darr(l|r)|p(s|c(up|ap)|or|dot|brcap)?|e(sc|pr)|vee|wed|larr(p)?|r(vearrow(left|right)|ly(eq(succ|prec)|vee|wedge)|arr(m)?|ren))|e(nt(erdot)?|dil|mptyv)|fr|w(conint|int)|lubs(uit)?|a(cute|p(s|c(up|ap)|dot|and|brcup)?|r(on|et))|r(oss|arr))|C(scr|hi|c(irc|onint|edil|aron)|ircle(Minus|Times|Dot|Plus)|Hcy|o(n(tourIntegral|int|gruent)|unterClockwiseContourIntegral|p(f|roduct)|lon(e)?)|dot|up(Cap)?|OPY|e(nterDot|dilla)|fr|lo(seCurly(DoubleQuote|Quote)|ckwiseContourIntegral)|a(yleys|cute|p(italDifferentialD)?)|ross))\n\t\t\t\t\t\t  | (d(s(c(y|r)|trok|ol)|har(l|r)|c(y|aron)|t(dot|ri(f)?)|i(sin|e|v(ide(ontimes)?|onx)?|am(s|ond(suit)?)?|gamma)|Har|z(cy|igrarr)|o(t(square|plus|eq(dot)?|minus)?|ublebarwedge|pf|wn(harpoon(left|right)|downarrows|arrow)|llar)|d(otseq|a(rr|gger))?|u(har|arr)|jcy|e(lta|g|mptyv)|f(isht|r)|wangle|lc(orn|rop)|a(sh(v)?|leth|rr|gger)|r(c(orn|rop)|bkarow)|b(karow|lac)|Arr)|D(s(cr|trok)|c(y|aron)|Scy|i(fferentialD|a(critical(Grave|Tilde|Do(t|ubleAcute)|Acute)|mond))|o(t(Dot|Equal)?|uble(Right(Tee|Arrow)|ContourIntegral|Do(t|wnArrow)|Up(DownArrow|Arrow)|VerticalBar|L(ong(RightArrow|Left(RightArrow|Arrow))|eft(RightArrow|Tee|Arrow)))|pf|wn(Right(TeeVector|Vector(Bar)?)|Breve|Tee(Arrow)?|arrow|Left(RightVector|TeeVector|Vector(Bar)?)|Arrow(Bar|UpArrow)?))|Zcy|el(ta)?|D(otrahd)?|Jcy|fr|a(shv|rr|gger)))\n\t\t\t\t\t\t  | (e(s(cr|im|dot)|n(sp|g)|c(y|ir(c)?|olon|aron)|t(h|a)|o(pf|gon)|dot|u(ro|ml)|p(si(v|lon)?|lus|ar(sl)?)|e|D(ot|Dot)|q(s(im|lant(less|gtr))|c(irc|olon)|u(iv(DD)?|est|als)|vparsl)|f(Dot|r)|l(s(dot)?|inters|l)?|a(ster|cute)|r(Dot|arr)|g(s(dot)?|rave)?|x(cl|ist|p(onentiale|ectation))|m(sp(1(3|4))?|pty(set|v)?|acr))|E(s(cr|im)|c(y|irc|aron)|ta|o(pf|gon)|NG|dot|uml|TH|psilon|qu(ilibrium|al(Tilde)?)|fr|lement|acute|grave|x(ists|ponentialE)|m(pty(SmallSquare|VerySmallSquare)|acr)))\n\t\t\t\t\t\t  | (f(scr|nof|cy|ilig|o(pf|r(k(v)?|all))|jlig|partint|emale|f(ilig|l(ig|lig)|r)|l(tns|lig|at)|allingdotseq|r(own|a(sl|c(1(2|8|3|4|5|6)|78|2(3|5)|3(8|4|5)|45|5(8|6)))))|F(scr|cy|illed(SmallSquare|VerySmallSquare)|o(uriertrf|pf|rAll)|fr))\n\t\t\t\t\t\t  | (G(scr|c(y|irc|edil)|t|opf|dot|T|Jcy|fr|amma(d)?|reater(Greater|SlantEqual|Tilde|Equal(Less)?|FullEqual|Less)|g|breve)|g(s(cr|im(e|l)?)|n(sim|e(q(q)?)?|E|ap(prox)?)|c(y|irc)|t(c(c|ir)|dot|quest|lPar|r(sim|dot|eq(qless|less)|less|a(pprox|rr)))?|imel|opf|dot|jcy|e(s(cc|dot(o(l)?)?|l(es)?)?|q(slant|q)?|l)?|v(nE|ertneqq)|fr|E(l)?|l(j|E|a)?|a(cute|p|mma(d)?)|rave|g(g)?|breve))\n\t\t\t\t\t\t  | (h(s(cr|trok|lash)|y(phen|bull)|circ|o(ok(leftarrow|rightarrow)|pf|arr|rbar|mtht)|e(llip|arts(uit)?|rcon)|ks(earow|warow)|fr|a(irsp|lf|r(dcy|r(cir|w)?)|milt)|bar|Arr)|H(s(cr|trok)|circ|ilbertSpace|o(pf|rizontalLine)|ump(DownHump|Equal)|fr|a(cek|t)|ARDcy))\n\t\t\t\t\t\t  | (i(s(cr|in(s(v)?|dot|v|E)?)|n(care|t(cal|prod|e(rcal|gers)|larhk)?|odot|fin(tie)?)?|c(y|irc)?|t(ilde)?|i(nfin|i(nt|int)|ota)?|o(cy|ta|pf|gon)|u(kcy|ml)|jlig|prod|e(cy|xcl)|quest|f(f|r)|acute|grave|m(of|ped|a(cr|th|g(part|e|line))))|I(scr|n(t(e(rsection|gral))?|visible(Comma|Times))|c(y|irc)|tilde|o(ta|pf|gon)|dot|u(kcy|ml)|Ocy|Jlig|fr|Ecy|acute|grave|m(plies|a(cr|ginaryI))?))\n\t\t\t\t\t\t  | (j(s(cr|ercy)|c(y|irc)|opf|ukcy|fr|math)|J(s(cr|ercy)|c(y|irc)|opf|ukcy|fr))\n\t\t\t\t\t\t  | (k(scr|hcy|c(y|edil)|opf|jcy|fr|appa(v)?|green)|K(scr|c(y|edil)|Hcy|opf|Jcy|fr|appa))\n\t\t\t\t\t\t  | (l(s(h|cr|trok|im(e|g)?|q(uo(r)?|b)|aquo)|h(ar(d|u(l)?)|blk)|n(sim|e(q(q)?)?|E|ap(prox)?)|c(y|ub|e(il|dil)|aron)|Barr|t(hree|c(c|ir)|imes|dot|quest|larr|r(i(e|f)?|Par))?|Har|o(ng(left(arrow|rightarrow)|rightarrow|mapsto)|times|z(enge|f)?|oparrow(left|right)|p(f|lus|ar)|w(ast|bar)|a(ng|rr)|brk)|d(sh|ca|quo(r)?|r(dhar|ushar))|ur(dshar|uhar)|jcy|par(lt)?|e(s(s(sim|dot|eq(qgtr|gtr)|approx|gtr)|cc|dot(o(r)?)?|g(es)?)?|q(slant|q)?|ft(harpoon(down|up)|threetimes|leftarrows|arrow(tail)?|right(squigarrow|harpoons|arrow(s)?))|g)?|v(nE|ertneqq)|f(isht|loor|r)|E(g)?|l(hard|corner|tri|arr)?|a(ng(d|le)?|cute|t(e(s)?|ail)?|p|emptyv|quo|rr(sim|hk|tl|pl|fs|lp|b(fs)?)?|gran|mbda)|r(har(d)?|corner|tri|arr|m)|g(E)?|m(idot|oust(ache)?)|b(arr|r(k(sl(d|u)|e)|ac(e|k))|brk)|A(tail|arr|rr))|L(s(h|cr|trok)|c(y|edil|aron)|t|o(ng(RightArrow|left(arrow|rightarrow)|rightarrow|Left(RightArrow|Arrow))|pf|wer(RightArrow|LeftArrow))|T|e(ss(Greater|SlantEqual|Tilde|EqualGreater|FullEqual|Less)|ft(Right(Vector|Arrow)|Ceiling|T(ee(Vector|Arrow)?|riangle(Bar|Equal)?)|Do(ubleBracket|wn(TeeVector|Vector(Bar)?))|Up(TeeVector|DownVector|Vector(Bar)?)|Vector(Bar)?|arrow|rightarrow|Floor|A(ngleBracket|rrow(RightArrow|Bar)?)))|Jcy|fr|l(eftarrow)?|a(ng|cute|placetrf|rr|mbda)|midot))\n\t\t\t\t\t\t  | (M(scr|cy|inusPlus|opf|u|e(diumSpace|llintrf)|fr|ap)|m(s(cr|tpos)|ho|nplus|c(y|omma)|i(nus(d(u)?|b)?|cro|d(cir|dot|ast)?)|o(dels|pf)|dash|u(ltimap|map)?|p|easuredangle|DDot|fr|l(cp|dr)|a(cr|p(sto(down|up|left)?)?|l(t(ese)?|e)|rker)))\n\t\t\t\t\t\t  | (n(s(hort(parallel|mid)|c(cue|e|r)?|im(e(q)?)?|u(cc(eq)?|p(set(eq(q)?)?|e|E)?|b(set(eq(q)?)?|e|E)?)|par|qsu(pe|be)|mid)|Rightarrow|h(par|arr|Arr)|G(t(v)?|g)|c(y|ong(dot)?|up|edil|a(p|ron))|t(ilde|lg|riangle(left(eq)?|right(eq)?)|gl)|i(s(d)?|v)?|o(t(ni(v(c|a|b))?|in(dot|v(c|a|b)|E)?)?|pf)|dash|u(m(sp|ero)?)?|jcy|p(olint|ar(sl|t|allel)?|r(cue|e(c(eq)?)?)?)|e(s(im|ear)|dot|quiv|ar(hk|r(ow)?)|xist(s)?|Arr)?|v(sim|infin|Harr|dash|Dash|l(t(rie)?|e|Arr)|ap|r(trie|Arr)|g(t|e))|fr|w(near|ar(hk|r(ow)?)|Arr)|V(dash|Dash)|l(sim|t(ri(e)?)?|dr|e(s(s)?|q(slant|q)?|ft(arrow|rightarrow))?|E|arr|Arr)|a(ng|cute|tur(al(s)?)?|p(id|os|prox|E)?|bla)|r(tri(e)?|ightarrow|arr(c|w)?|Arr)|g(sim|t(r)?|e(s|q(slant|q)?)?|E)|mid|L(t(v)?|eft(arrow|rightarrow)|l)|b(sp|ump(e)?))|N(scr|c(y|edil|aron)|tilde|o(nBreakingSpace|Break|t(R(ightTriangle(Bar|Equal)?|everseElement)|Greater(Greater|SlantEqual|Tilde|Equal|FullEqual|Less)?|S(u(cceeds(SlantEqual|Tilde|Equal)?|perset(Equal)?|bset(Equal)?)|quareSu(perset(Equal)?|bset(Equal)?))|Hump(DownHump|Equal)|Nested(GreaterGreater|LessLess)|C(ongruent|upCap)|Tilde(Tilde|Equal|FullEqual)?|DoubleVerticalBar|Precedes(SlantEqual|Equal)?|E(qual(Tilde)?|lement|xists)|VerticalBar|Le(ss(Greater|SlantEqual|Tilde|Equal|Less)?|ftTriangle(Bar|Equal)?))?|pf)|u|e(sted(GreaterGreater|LessLess)|wLine|gative(MediumSpace|Thi(nSpace|ckSpace)|VeryThinSpace))|Jcy|fr|acute))\n\t\t\t\t\t\t  | (o(s(cr|ol|lash)|h(m|bar)|c(y|ir(c)?)|ti(lde|mes(as)?)|S|int|opf|d(sold|iv|ot|ash|blac)|uml|p(erp|lus|ar)|elig|vbar|f(cir|r)|l(c(ir|ross)|t|ine|arr)|a(st|cute)|r(slope|igof|or|d(er(of)?|f|m)?|v|arr)?|g(t|on|rave)|m(i(nus|cron|d)|ega|acr))|O(s(cr|lash)|c(y|irc)|ti(lde|mes)|opf|dblac|uml|penCurly(DoubleQuote|Quote)|ver(B(ar|rac(e|ket))|Parenthesis)|fr|Elig|acute|r|grave|m(icron|ega|acr)))\n\t\t\t\t\t\t  | (p(s(cr|i)|h(i(v)?|one|mmat)|cy|i(tchfork|v)?|o(intint|und|pf)|uncsp|er(cnt|tenk|iod|p|mil)|fr|l(us(sim|cir|two|d(o|u)|e|acir|mn|b)?|an(ck(h)?|kv))|ar(s(im|l)|t|a(llel)?)?|r(sim|n(sim|E|ap)|cue|ime(s)?|o(d|p(to)?|f(surf|line|alar))|urel|e(c(sim|n(sim|eqq|approx)|curlyeq|eq|approx)?)?|E|ap)?|m)|P(s(cr|i)|hi|cy|i|o(incareplane|pf)|fr|lusMinus|artialD|r(ime|o(duct|portion(al)?)|ecedes(SlantEqual|Tilde|Equal)?)?))\n\t\t\t\t\t\t  | (q(scr|int|opf|u(ot|est(eq)?|at(int|ernions))|prime|fr)|Q(scr|opf|UOT|fr))\n\t\t\t\t\t\t  | (R(s(h|cr)|ho|c(y|edil|aron)|Barr|ight(Ceiling|T(ee(Vector|Arrow)?|riangle(Bar|Equal)?)|Do(ubleBracket|wn(TeeVector|Vector(Bar)?))|Up(TeeVector|DownVector|Vector(Bar)?)|Vector(Bar)?|arrow|Floor|A(ngleBracket|rrow(Bar|LeftArrow)?))|o(undImplies|pf)|uleDelayed|e(verse(UpEquilibrium|E(quilibrium|lement)))?|fr|EG|a(ng|cute|rr(tl)?)|rightarrow)|r(s(h|cr|q(uo(r)?|b)|aquo)|h(o(v)?|ar(d|u(l)?))|nmid|c(y|ub|e(il|dil)|aron)|Barr|t(hree|imes|ri(e|f|ltri)?)|i(singdotseq|ng|ght(squigarrow|harpoon(down|up)|threetimes|left(harpoons|arrows)|arrow(tail)?|rightarrows))|Har|o(times|p(f|lus|ar)|a(ng|rr)|brk)|d(sh|ca|quo(r)?|ldhar)|uluhar|p(polint|ar(gt)?)|e(ct|al(s|ine|part)?|g)|f(isht|loor|r)|l(har|arr|m)|a(ng(d|e|le)?|c(ute|e)|t(io(nals)?|ail)|dic|emptyv|quo|rr(sim|hk|c|tl|pl|fs|w|lp|ap|b(fs)?)?)|rarr|x|moust(ache)?|b(arr|r(k(sl(d|u)|e)|ac(e|k))|brk)|A(tail|arr|rr)))\n\t\t\t\t\t\t  | (s(s(cr|tarf|etmn|mile)|h(y|c(hcy|y)|ort(parallel|mid)|arp)|c(sim|y|n(sim|E|ap)|cue|irc|polint|e(dil)?|E|a(p|ron))?|t(ar(f)?|r(ns|aight(phi|epsilon)))|i(gma(v|f)?|m(ne|dot|plus|e(q)?|l(E)?|rarr|g(E)?)?)|zlig|o(pf|ftcy|l(b(ar)?)?)|dot(e|b)?|u(ng|cc(sim|n(sim|eqq|approx)|curlyeq|eq|approx)?|p(s(im|u(p|b)|et(neq(q)?|eq(q)?)?)|hs(ol|ub)|1|n(e|E)|2|d(sub|ot)|3|plus|e(dot)?|E|larr|mult)?|m|b(s(im|u(p|b)|et(neq(q)?|eq(q)?)?)|n(e|E)|dot|plus|e(dot)?|E|rarr|mult)?)|pa(des(uit)?|r)|e(swar|ct|tm(n|inus)|ar(hk|r(ow)?)|xt|mi|Arr)|q(su(p(set(eq)?|e)?|b(set(eq)?|e)?)|c(up(s)?|ap(s)?)|u(f|ar(e|f))?)|fr(own)?|w(nwar|ar(hk|r(ow)?)|Arr)|larr|acute|rarr|m(t(e(s)?)?|i(d|le)|eparsl|a(shp|llsetminus))|bquo)|S(scr|hort(RightArrow|DownArrow|UpArrow|LeftArrow)|c(y|irc|edil|aron)?|tar|igma|H(cy|CHcy)|opf|u(c(hThat|ceeds(SlantEqual|Tilde|Equal)?)|p(set|erset(Equal)?)?|m|b(set(Equal)?)?)|OFTcy|q(uare(Su(perset(Equal)?|bset(Equal)?)|Intersection|Union)?|rt)|fr|acute|mallCircle))\n\t\t\t\t\t\t  | (t(s(hcy|c(y|r)|trok)|h(i(nsp|ck(sim|approx))|orn|e(ta(sym|v)?|re(4|fore))|k(sim|ap))|c(y|edil|aron)|i(nt|lde|mes(d|b(ar)?)?)|o(sa|p(cir|f(ork)?|bot)?|ea)|dot|prime|elrec|fr|w(ixt|ohead(leftarrow|rightarrow))|a(u|rget)|r(i(sb|time|dot|plus|e|angle(down|q|left(eq)?|right(eq)?)?|minus)|pezium|ade)|brk)|T(s(cr|trok)|RADE|h(i(nSpace|ckSpace)|e(ta|refore))|c(y|edil|aron)|S(cy|Hcy)|ilde(Tilde|Equal|FullEqual)?|HORN|opf|fr|a(u|b)|ripleDot))\n\t\t\t\t\t\t  | (u(scr|h(ar(l|r)|blk)|c(y|irc)|t(ilde|dot|ri(f)?)|Har|o(pf|gon)|d(har|arr|blac)|u(arr|ml)|p(si(h|lon)?|harpoon(left|right)|downarrow|uparrows|lus|arrow)|f(isht|r)|wangle|l(c(orn(er)?|rop)|tri)|a(cute|rr)|r(c(orn(er)?|rop)|tri|ing)|grave|m(l|acr)|br(cy|eve)|Arr)|U(scr|n(ion(Plus)?|der(B(ar|rac(e|ket))|Parenthesis))|c(y|irc)|tilde|o(pf|gon)|dblac|uml|p(si(lon)?|downarrow|Tee(Arrow)?|per(RightArrow|LeftArrow)|DownArrow|Equilibrium|arrow|Arrow(Bar|DownArrow)?)|fr|a(cute|rr(ocir)?)|ring|grave|macr|br(cy|eve)))\n\t\t\t\t\t\t  | (v(s(cr|u(pn(e|E)|bn(e|E)))|nsu(p|b)|cy|Bar(v)?|zigzag|opf|dash|prop|e(e(eq|bar)?|llip|r(t|bar))|Dash|fr|ltri|a(ngrt|r(s(igma|u(psetneq(q)?|bsetneq(q)?))|nothing|t(heta|riangle(left|right))|p(hi|i|ropto)|epsilon|kappa|r(ho)?))|rtri|Arr)|V(scr|cy|opf|dash(l)?|e(e|r(yThinSpace|t(ical(Bar|Separator|Tilde|Line))?|bar))|Dash|vdash|fr|bar))\n\t\t\t\t\t\t  | (w(scr|circ|opf|p|e(ierp|d(ge(q)?|bar))|fr|r(eath)?)|W(scr|circ|opf|edge|fr))\n\t\t\t\t\t\t  | (X(scr|i|opf|fr)|x(s(cr|qcup)|h(arr|Arr)|nis|c(irc|up|ap)|i|o(time|dot|p(f|lus))|dtri|u(tri|plus)|vee|fr|wedge|l(arr|Arr)|r(arr|Arr)|map))\n\t\t\t\t\t\t  | (y(scr|c(y|irc)|icy|opf|u(cy|ml)|en|fr|ac(y|ute))|Y(scr|c(y|irc)|opf|uml|Icy|Ucy|fr|acute|Acy))\n\t\t\t\t\t\t  | (z(scr|hcy|c(y|aron)|igrarr|opf|dot|e(ta|etrf)|fr|w(nj|j)|acute)|Z(scr|c(y|aron)|Hcy|opf|dot|e(ta|roWidthSpace)|fr|acute))\n\t\t\t\t\t\t)\n\t\t\t\t\t\t(;)\n\t\t\t\t\t",
          "name": "constant.character.entity.named.$2.html"
        },
        {
          "captures": {
            "1": {
              "name": "punctuation.definition.entity.html"
            },
            "3": {
              "name": "punctuation.definition.entity.html"
            }
          },
          "match": "(&)#[0-9]+(;)",
          "name": "constant.character.entity.numeric.decimal.html"
        },
        {
          "captures": {
            "1": {
              "name": "punctuation.definition.entity.html"
            },
            "3": {
              "name": "punctuation.definition.entity.html"
            }
          },
          "match": "(&)#[xX][0-9a-fA-F]+(;)",
          "name": "constant.character.entity.numeric.hexadecimal.html"
        },
        {
          "match": "&(?=[a-zA-Z0-9]+;)",
          "name": "invalid.illegal.ambiguous-ampersand.html"
        }
      ]
    },
    "math": {
      "patterns": [
        {
          "begin": "(?i)(<)(math)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
          "beginCaptures": {
            "0": {
              "name": "meta.tag.structure.$2.start.html"
            },
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "patterns": [
                {
                  "include": "#attribute"
                }
              ]
            },
            "5": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "end": "(?i)(</)(\\2)\\s*(>)",
          "endCaptures": {
            "0": {
              "name": "meta.tag.structure.$2.end.html"
            },
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.element.structure.$2.html",
          "patterns": [
            {
              "begin": "(?<!>)\\G",
              "end": ">",
              "endCaptures": {
                "0": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.tag.structure.start.html",
              "patterns": [
                {
                  "include": "#attribute"
                }
              ]
            },
            {
              "include": "#tags"
            }
          ]
        }
      ],
      "repository": {
        "attribute": {
          "patterns": [
            {
              "begin": "(s(hift|ymmetric|cript(sizemultiplier|level|minsize)|t(ackalign|retchy)|ide|u(pscriptshift|bscriptshift)|e(parator(s)?|lection)|rc)|h(eight|ref)|n(otation|umalign)|c(haralign|olumn(spa(n|cing)|width|lines|align)|lose|rossout)|i(n(dent(shift(first|last)?|target|align(first|last)?)|fixlinebreakstyle)|d)|o(pen|verflow)|d(i(splay(style)?|r)|e(nomalign|cimalpoint|pth))|position|e(dge|qual(columns|rows))|voffset|f(orm|ence|rame(spacing)?)|width|l(space|ine(thickness|leading|break(style|multchar)?)|o(ngdivstyle|cation)|ength|quote|argeop)|a(c(cent(under)?|tiontype)|l(t(text|img(-(height|valign|width))?)|ign(mentscope)?))|r(space|ow(spa(n|cing)|lines|align)|quote)|groupalign|x(link:href|mlns)|m(in(size|labelspacing)|ovablelimits|a(th(size|color|variant|background)|xsize))|bevelled)(?![\\w:-])",
              "beginCaptures": {
                "0": {
                  "name": "entity.other.attribute-name.html"
                }
              },
              "end": "(?=\\s*+[^=\\s])",
              "name": "meta.attribute.$1.html",
              "patterns": [
                {
                  "include": "#attribute-interior"
                }
              ]
            },
            {
              "begin": "([^\\x{0020}\"'<>/=\\x{0000}-\\x{001F}\\x{007F}-\\x{009F}\\x{FDD0}-\\x{FDEF}\\x{FFFE}\\x{FFFF}\\x{1FFFE}\\x{1FFFF}\\x{2FFFE}\\x{2FFFF}\\x{3FFFE}\\x{3FFFF}\\x{4FFFE}\\x{4FFFF}\\x{5FFFE}\\x{5FFFF}\\x{6FFFE}\\x{6FFFF}\\x{7FFFE}\\x{7FFFF}\\x{8FFFE}\\x{8FFFF}\\x{9FFFE}\\x{9FFFF}\\x{AFFFE}\\x{AFFFF}\\x{BFFFE}\\x{BFFFF}\\x{CFFFE}\\x{CFFFF}\\x{DFFFE}\\x{DFFFF}\\x{EFFFE}\\x{EFFFF}\\x{FFFFE}\\x{FFFFF}\\x{10FFFE}\\x{10FFFF}]+)",
              "beginCaptures": {
                "0": {
                  "name": "entity.other.attribute-name.html"
                }
              },
              "comment": "Anything else that is valid",
              "end": "(?=\\s*+[^=\\s])",
              "name": "meta.attribute.unrecognized.$1.html",
              "patterns": [
                {
                  "include": "#attribute-interior"
                }
              ]
            },
            {
              "match": "[^\\s>]+",
              "name": "invalid.illegal.character-not-allowed-here.html"
            }
          ]
        },
        "tags": {
          "patterns": [
            {
              "include": "#comment"
            },
            {
              "include": "#cdata"
            },
            {
              "captures": {
                "0": {
                  "name": "meta.tag.structure.math.$2.void.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "match": "(?i)(<)(annotation|annotation-xml|semantics|menclose|merror|mfenced|mfrac|mpadded|mphantom|mroot|mrow|msqrt|mstyle|mmultiscripts|mover|mprescripts|msub|msubsup|msup|munder|munderover|none|mlabeledtr|mtable|mtd|mtr|mlongdiv|mscarries|mscarry|msgroup|msline|msrow|mstack|maction)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(/>))",
              "name": "meta.element.structure.math.$2.html"
            },
            {
              "begin": "(?i)(<)(annotation|annotation-xml|semantics|menclose|merror|mfenced|mfrac|mpadded|mphantom|mroot|mrow|msqrt|mstyle|mmultiscripts|mover|mprescripts|msub|msubsup|msup|munder|munderover|none|mlabeledtr|mtable|mtd|mtr|mlongdiv|mscarries|mscarry|msgroup|msline|msrow|mstack|maction)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.structure.math.$2.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "end": "(?i)(</)(\\2)\\s*(>)|(/>)|(?=</\\w+)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.structure.math.$2.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "punctuation.definition.tag.end.html"
                },
                "4": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.element.structure.math.$2.html",
              "patterns": [
                {
                  "begin": "(?<!>)\\G",
                  "end": "(?=/>)|>",
                  "endCaptures": {
                    "0": {
                      "name": "punctuation.definition.tag.end.html"
                    }
                  },
                  "name": "meta.tag.structure.start.html",
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                {
                  "include": "#tags"
                }
              ]
            },
            {
              "captures": {
                "0": {
                  "name": "meta.tag.inline.math.$2.void.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "match": "(?i)(<)(mi|mn|mo|ms|mspace|mtext|maligngroup|malignmark)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(/>))",
              "name": "meta.element.inline.math.$2.html"
            },
            {
              "begin": "(?i)(<)(mi|mn|mo|ms|mspace|mtext|maligngroup|malignmark)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.inline.math.$2.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "end": "(?i)(</)(\\2)\\s*(>)|(/>)|(?=</\\w+)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.inline.math.$2.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "punctuation.definition.tag.end.html"
                },
                "4": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.element.inline.math.$2.html",
              "patterns": [
                {
                  "begin": "(?<!>)\\G",
                  "end": "(?=/>)|>",
                  "endCaptures": {
                    "0": {
                      "name": "punctuation.definition.tag.end.html"
                    }
                  },
                  "name": "meta.tag.inline.start.html",
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                {
                  "include": "#tags"
                }
              ]
            },
            {
              "captures": {
                "0": {
                  "name": "meta.tag.object.math.$2.void.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "match": "(?i)(<)(mglyph)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(/>))",
              "name": "meta.element.object.math.$2.html"
            },
            {
              "begin": "(?i)(<)(mglyph)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.object.math.$2.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "end": "(?i)(</)(\\2)\\s*(>)|(/>)|(?=</\\w+)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.object.math.$2.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "punctuation.definition.tag.end.html"
                },
                "4": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.element.object.math.$2.html",
              "patterns": [
                {
                  "begin": "(?<!>)\\G",
                  "end": "(?=/>)|>",
                  "endCaptures": {
                    "0": {
                      "name": "punctuation.definition.tag.end.html"
                    }
                  },
                  "name": "meta.tag.object.start.html",
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                {
                  "include": "#tags"
                }
              ]
            },
            {
              "captures": {
                "0": {
                  "name": "meta.tag.other.invalid.void.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "invalid.illegal.unrecognized-tag.html"
                },
                "4": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "6": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "match": "(?i)(<)(([\\w:]+))(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(/>))",
              "name": "meta.element.other.invalid.html"
            },
            {
              "begin": "(?i)(<)((\\w[^\\s>]*))(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.other.invalid.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "invalid.illegal.unrecognized-tag.html"
                },
                "4": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "6": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "end": "(?i)(</)((\\2))\\s*(>)|(/>)|(?=</\\w+)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.other.invalid.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "invalid.illegal.unrecognized-tag.html"
                },
                "4": {
                  "name": "punctuation.definition.tag.end.html"
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.element.other.invalid.html",
              "patterns": [
                {
                  "begin": "(?<!>)\\G",
                  "end": "(?=/>)|>",
                  "endCaptures": {
                    "0": {
                      "name": "punctuation.definition.tag.end.html"
                    }
                  },
                  "name": "meta.tag.other.invalid.start.html",
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                {
                  "include": "#tags"
                }
              ]
            },
            {
              "include": "#tags-invalid"
            }
          ]
        }
      }
    },
    "svg": {
      "patterns": [
        {
          "begin": "(?i)(<)(svg)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
          "beginCaptures": {
            "0": {
              "name": "meta.tag.structure.$2.start.html"
            },
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "patterns": [
                {
                  "include": "#attribute"
                }
              ]
            },
            "5": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "end": "(?i)(</)(\\2)\\s*(>)",
          "endCaptures": {
            "0": {
              "name": "meta.tag.structure.$2.end.html"
            },
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.element.structure.$2.html",
          "patterns": [
            {
              "begin": "(?<!>)\\G",
              "end": ">",
              "endCaptures": {
                "0": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.tag.structure.start.html",
              "patterns": [
                {
                  "include": "#attribute"
                }
              ]
            },
            {
              "include": "#tags"
            }
          ]
        }
      ],
      "repository": {
        "attribute": {
          "patterns": [
            {
              "begin": "(s(hape-rendering|ystemLanguage|cale|t(yle|itchTiles|op-(color|opacity)|dDeviation|em(h|v)|artOffset|r(i(ng|kethrough-(thickness|position))|oke(-(opacity|dash(offset|array)|width|line(cap|join)|miterlimit))?))|urfaceScale|p(e(cular(Constant|Exponent)|ed)|acing|readMethod)|eed|lope)|h(oriz-(origin-x|adv-x)|eight|anging|ref(lang)?)|y(1|2|ChannelSelector)?|n(umOctaves|ame)|c(y|o(ntentS(criptType|tyleType)|lor(-(interpolation(-filters)?|profile|rendering))?)|ursor|l(ip(-(path|rule)|PathUnits)?|ass)|a(p-height|lcMode)|x)|t(ype|o|ext(-(decoration|anchor|rendering)|Length)|a(rget(X|Y)?|b(index|leValues))|ransform)|i(n(tercept|2)?|d(eographic)?|mage-rendering)|z(oomAndPan)?|o(p(erator|acity)|ver(flow|line-(thickness|position))|ffset|r(i(ent(ation)?|gin)|der))|d(y|i(splay|visor|ffuseConstant|rection)|ominant-baseline|ur|e(scent|celerate)|x)?|u(1|n(i(code(-(range|bidi))?|ts-per-em)|derline-(thickness|position))|2)|p(ing|oint(s(At(X|Y|Z))?|er-events)|a(nose-1|t(h(Length)?|tern(ContentUnits|Transform|Units))|int-order)|r(imitiveUnits|eserveA(spectRatio|lpha)))|e(n(d|able-background)|dgeMode|levation|x(ternalResourcesRequired|ponent))|v(i(sibility|ew(Box|Target))|-(hanging|ideographic|alphabetic|mathematical)|e(ctor-effect|r(sion|t-(origin-(y|x)|adv-y)))|alues)|k(1|2|3|e(y(Splines|Times|Points)|rn(ing|el(Matrix|UnitLength)))|4)?|f(y|il(ter(Res|Units)?|l(-(opacity|rule))?)|o(nt-(s(t(yle|retch)|ize(-adjust)?)|variant|family|weight)|rmat)|lood-(color|opacity)|r(om)?|x)|w(idth(s)?|ord-spacing|riting-mode)|l(i(ghting-color|mitingConeAngle)|ocal|e(ngthAdjust|tter-spacing)|ang)|a(scent|cc(umulate|ent-height)|ttribute(Name|Type)|zimuth|dditive|utoReverse|l(ignment-baseline|phabetic|lowReorder)|rabic-form|mplitude)|r(y|otate|e(s(tart|ult)|ndering-intent|peat(Count|Dur)|quired(Extensions|Features)|f(X|Y|errerPolicy)|l)|adius|x)?|g(1|2|lyph(Ref|-(name|orientation-(horizontal|vertical)))|radient(Transform|Units))|x(1|2|ChannelSelector|-height|link:(show|href|t(ype|itle)|a(ctuate|rcrole)|role)|ml:(space|lang|base))?|m(in|ode|e(thod|dia)|a(sk(ContentUnits|Units)?|thematical|rker(Height|-(start|end|mid)|Units|Width)|x))|b(y|ias|egin|ase(Profile|line-shift|Frequency)|box))(?![\\w:-])",
              "beginCaptures": {
                "0": {
                  "name": "entity.other.attribute-name.html"
                }
              },
              "end": "(?=\\s*+[^=\\s])",
              "name": "meta.attribute.$1.html",
              "patterns": [
                {
                  "include": "#attribute-interior"
                }
              ]
            },
            {
              "begin": "([^\\x{0020}\"'<>/=\\x{0000}-\\x{001F}\\x{007F}-\\x{009F}\\x{FDD0}-\\x{FDEF}\\x{FFFE}\\x{FFFF}\\x{1FFFE}\\x{1FFFF}\\x{2FFFE}\\x{2FFFF}\\x{3FFFE}\\x{3FFFF}\\x{4FFFE}\\x{4FFFF}\\x{5FFFE}\\x{5FFFF}\\x{6FFFE}\\x{6FFFF}\\x{7FFFE}\\x{7FFFF}\\x{8FFFE}\\x{8FFFF}\\x{9FFFE}\\x{9FFFF}\\x{AFFFE}\\x{AFFFF}\\x{BFFFE}\\x{BFFFF}\\x{CFFFE}\\x{CFFFF}\\x{DFFFE}\\x{DFFFF}\\x{EFFFE}\\x{EFFFF}\\x{FFFFE}\\x{FFFFF}\\x{10FFFE}\\x{10FFFF}]+)",
              "beginCaptures": {
                "0": {
                  "name": "entity.other.attribute-name.html"
                }
              },
              "comment": "Anything else that is valid",
              "end": "(?=\\s*+[^=\\s])",
              "name": "meta.attribute.unrecognized.$1.html",
              "patterns": [
                {
                  "include": "#attribute-interior"
                }
              ]
            },
            {
              "match": "[^\\s>]+",
              "name": "invalid.illegal.character-not-allowed-here.html"
            }
          ]
        },
        "tags": {
          "patterns": [
            {
              "include": "#comment"
            },
            {
              "include": "#cdata"
            },
            {
              "captures": {
                "0": {
                  "name": "meta.tag.metadata.svg.$2.void.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "match": "(?i)(<)(color-profile|desc|metadata|script|style|title)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(/>))",
              "name": "meta.element.metadata.svg.$2.html"
            },
            {
              "begin": "(?i)(<)(color-profile|desc|metadata|script|style|title)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.metadata.svg.$2.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "end": "(?i)(</)(\\2)\\s*(>)|(/>)|(?=</\\w+)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.metadata.svg.$2.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "punctuation.definition.tag.end.html"
                },
                "4": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.element.metadata.svg.$2.html",
              "patterns": [
                {
                  "begin": "(?<!>)\\G",
                  "end": "(?=/>)|>",
                  "endCaptures": {
                    "0": {
                      "name": "punctuation.definition.tag.end.html"
                    }
                  },
                  "name": "meta.tag.metadata.start.html",
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                {
                  "include": "#tags"
                }
              ]
            },
            {
              "captures": {
                "0": {
                  "name": "meta.tag.structure.svg.$2.void.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "match": "(?i)(<)(animateMotion|clipPath|defs|feComponentTransfer|feDiffuseLighting|feMerge|feSpecularLighting|filter|g|hatch|linearGradient|marker|mask|mesh|meshgradient|meshpatch|meshrow|pattern|radialGradient|switch|text|textPath)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(/>))",
              "name": "meta.element.structure.svg.$2.html"
            },
            {
              "begin": "(?i)(<)(animateMotion|clipPath|defs|feComponentTransfer|feDiffuseLighting|feMerge|feSpecularLighting|filter|g|hatch|linearGradient|marker|mask|mesh|meshgradient|meshpatch|meshrow|pattern|radialGradient|switch|text|textPath)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.structure.svg.$2.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "end": "(?i)(</)(\\2)\\s*(>)|(/>)|(?=</\\w+)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.structure.svg.$2.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "punctuation.definition.tag.end.html"
                },
                "4": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.element.structure.svg.$2.html",
              "patterns": [
                {
                  "begin": "(?<!>)\\G",
                  "end": "(?=/>)|>",
                  "endCaptures": {
                    "0": {
                      "name": "punctuation.definition.tag.end.html"
                    }
                  },
                  "name": "meta.tag.structure.start.html",
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                {
                  "include": "#tags"
                }
              ]
            },
            {
              "captures": {
                "0": {
                  "name": "meta.tag.inline.svg.$2.void.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "match": "(?i)(<)(a|animate|discard|feBlend|feColorMatrix|feComposite|feConvolveMatrix|feDisplacementMap|feDistantLight|feDropShadow|feFlood|feFuncA|feFuncB|feFuncG|feFuncR|feGaussianBlur|feMergeNode|feMorphology|feOffset|fePointLight|feSpotLight|feTile|feTurbulence|hatchPath|mpath|set|solidcolor|stop|tspan)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(/>))",
              "name": "meta.element.inline.svg.$2.html"
            },
            {
              "begin": "(?i)(<)(a|animate|discard|feBlend|feColorMatrix|feComposite|feConvolveMatrix|feDisplacementMap|feDistantLight|feDropShadow|feFlood|feFuncA|feFuncB|feFuncG|feFuncR|feGaussianBlur|feMergeNode|feMorphology|feOffset|fePointLight|feSpotLight|feTile|feTurbulence|hatchPath|mpath|set|solidcolor|stop|tspan)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.inline.svg.$2.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "end": "(?i)(</)(\\2)\\s*(>)|(/>)|(?=</\\w+)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.inline.svg.$2.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "punctuation.definition.tag.end.html"
                },
                "4": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.element.inline.svg.$2.html",
              "patterns": [
                {
                  "begin": "(?<!>)\\G",
                  "end": "(?=/>)|>",
                  "endCaptures": {
                    "0": {
                      "name": "punctuation.definition.tag.end.html"
                    }
                  },
                  "name": "meta.tag.inline.start.html",
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                {
                  "include": "#tags"
                }
              ]
            },
            {
              "captures": {
                "0": {
                  "name": "meta.tag.object.svg.$2.void.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "match": "(?i)(<)(circle|ellipse|feImage|foreignObject|image|line|path|polygon|polyline|rect|symbol|use|view)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(/>))",
              "name": "meta.element.object.svg.$2.html"
            },
            {
              "begin": "(?i)(<)(a|circle|ellipse|feImage|foreignObject|image|line|path|polygon|polyline|rect|symbol|use|view)(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.object.svg.$2.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "end": "(?i)(</)(\\2)\\s*(>)|(/>)|(?=</\\w+)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.object.svg.$2.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "punctuation.definition.tag.end.html"
                },
                "4": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.element.object.svg.$2.html",
              "patterns": [
                {
                  "begin": "(?<!>)\\G",
                  "end": "(?=/>)|>",
                  "endCaptures": {
                    "0": {
                      "name": "punctuation.definition.tag.end.html"
                    }
                  },
                  "name": "meta.tag.object.start.html",
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                {
                  "include": "#tags"
                }
              ]
            },
            {
              "captures": {
                "0": {
                  "name": "meta.tag.other.svg.$2.void.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "invalid.deprecated.html"
                },
                "4": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "6": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "match": "(?i)(<)((altGlyph|altGlyphDef|altGlyphItem|animateColor|animateTransform|cursor|font|font-face|font-face-format|font-face-name|font-face-src|font-face-uri|glyph|glyphRef|hkern|missing-glyph|tref|vkern))(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(/>))",
              "name": "meta.element.other.svg.$2.html"
            },
            {
              "begin": "(?i)(<)((altGlyph|altGlyphDef|altGlyphItem|animateColor|animateTransform|cursor|font|font-face|font-face-format|font-face-name|font-face-src|font-face-uri|glyph|glyphRef|hkern|missing-glyph|tref|vkern))(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.other.svg.$2.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "invalid.deprecated.html"
                },
                "4": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "6": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "end": "(?i)(</)((\\2))\\s*(>)|(/>)|(?=</\\w+)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.other.svg.$2.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "invalid.deprecated.html"
                },
                "4": {
                  "name": "punctuation.definition.tag.end.html"
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.element.other.svg.$2.html",
              "patterns": [
                {
                  "begin": "(?<!>)\\G",
                  "end": "(?=/>)|>",
                  "endCaptures": {
                    "0": {
                      "name": "punctuation.definition.tag.end.html"
                    }
                  },
                  "name": "meta.tag.other.start.html",
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                {
                  "include": "#tags"
                }
              ]
            },
            {
              "captures": {
                "0": {
                  "name": "meta.tag.other.invalid.void.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "invalid.illegal.unrecognized-tag.html"
                },
                "4": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "6": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "match": "(?i)(<)(([\\w:]+))(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(/>))",
              "name": "meta.element.other.invalid.html"
            },
            {
              "begin": "(?i)(<)((\\w[^\\s>]*))(?=\\s|/?>)(?:(([^\"'>]|\"[^\"]*\"|'[^']*')*)(>))?",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.other.invalid.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "invalid.illegal.unrecognized-tag.html"
                },
                "4": {
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                "6": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "end": "(?i)(</)((\\2))\\s*(>)|(/>)|(?=</\\w+)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.other.invalid.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "invalid.illegal.unrecognized-tag.html"
                },
                "4": {
                  "name": "punctuation.definition.tag.end.html"
                },
                "5": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.element.other.invalid.html",
              "patterns": [
                {
                  "begin": "(?<!>)\\G",
                  "end": "(?=/>)|>",
                  "endCaptures": {
                    "0": {
                      "name": "punctuation.definition.tag.end.html"
                    }
                  },
                  "name": "meta.tag.other.invalid.start.html",
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                {
                  "include": "#tags"
                }
              ]
            },
            {
              "include": "#tags-invalid"
            }
          ]
        }
      }
    },
    "tags-invalid": {
      "patterns": [
        {
          "begin": "(</?)((\\w[^\\s>]*))(?<!/)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "invalid.illegal.unrecognized-tag.html"
            }
          },
          "end": "((?: ?/)?>)",
          "endCaptures": {
            "1": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.other.$2.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        }
      ]
    },
    "tags-valid": {
      "patterns": [
        {
          "begin": "(^[ \\t]+)?(?=<(?i:style)\\b(?!-))",
          "beginCaptures": {
            "1": {
              "name": "punctuation.whitespace.embedded.leading.html"
            }
          },
          "end": "(?!\\G)([ \\t]*$\\n?)?",
          "endCaptures": {
            "1": {
              "name": "punctuation.whitespace.embedded.trailing.html"
            }
          },
          "patterns": [
            {
              "begin": "(?i)(<)(style)(?=\\s|/?>)",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.metadata.style.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                }
              },
              "end": "(?i)((<)/)(style)\\s*(>)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.metadata.style.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "source.css-ignored-vscode"
                },
                "3": {
                  "name": "entity.name.tag.html"
                },
                "4": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.embedded.block.html",
              "patterns": [
                {
                  "begin": "\\G",
                  "captures": {
                    "1": {
                      "name": "punctuation.definition.tag.end.html"
                    }
                  },
                  "end": "(>)",
                  "name": "meta.tag.metadata.style.start.html",
                  "patterns": [
                    {
                      "include": "#attribute"
                    }
                  ]
                },
                {
                  "begin": "(?!\\G)",
                  "end": "(?=</(?i:style))",
                  "name": "source.css",
                  "patterns": [
                    {
                      "include": "source.css"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "begin": "(^[ \\t]+)?(?=<(?i:script)\\b(?!-))",
          "beginCaptures": {
            "1": {
              "name": "punctuation.whitespace.embedded.leading.html"
            }
          },
          "end": "(?!\\G)([ \\t]*$\\n?)?",
          "endCaptures": {
            "1": {
              "name": "punctuation.whitespace.embedded.trailing.html"
            }
          },
          "patterns": [
            {
              "begin": "(<)((?i:script))\\b",
              "beginCaptures": {
                "0": {
                  "name": "meta.tag.metadata.script.start.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                }
              },
              "end": "(/)((?i:script))(>)",
              "endCaptures": {
                "0": {
                  "name": "meta.tag.metadata.script.end.html"
                },
                "1": {
                  "name": "punctuation.definition.tag.begin.html"
                },
                "2": {
                  "name": "entity.name.tag.html"
                },
                "3": {
                  "name": "punctuation.definition.tag.end.html"
                }
              },
              "name": "meta.embedded.block.html",
              "patterns": [
                {
                  "begin": "\\G",
                  "end": "(?=/)",
                  "patterns": [
                    {
                      "begin": "(>)",
                      "beginCaptures": {
                        "0": {
                          "name": "meta.tag.metadata.script.start.html"
                        },
                        "1": {
                          "name": "punctuation.definition.tag.end.html"
                        }
                      },
                      "end": "((<))(?=/(?i:script))",
                      "endCaptures": {
                        "0": {
                          "name": "meta.tag.metadata.script.end.html"
                        },
                        "1": {
                          "name": "punctuation.definition.tag.begin.html"
                        },
                        "2": {
                          "name": "source.js-ignored-vscode"
                        }
                      },
                      "patterns": [
                        {
                          "begin": "\\G",
                          "end": "(?=</(?i:script))",
                          "name": "source.js",
                          "patterns": [
                            {
                              "begin": "(^[ \\t]+)?(?=//)",
                              "beginCaptures": {
                                "1": {
                                  "name": "punctuation.whitespace.comment.leading.js"
                                }
                              },
                              "end": "(?!\\G)",
                              "patterns": [
                                {
                                  "begin": "//",
                                  "beginCaptures": {
                                    "0": {
                                      "name": "punctuation.definition.comment.js"
                                    }
                                  },
                                  "end": "(?=</script)|\\n",
                                  "name": "comment.line.double-slash.js"
                                }
                              ]
                            },
                            {
                              "begin": "/\\*",
                              "captures": {
                                "0": {
                                  "name": "punctuation.definition.comment.js"
                                }
                              },
                              "end": "\\*/|(?=</script)",
                              "name": "comment.block.js"
                            },
                            {
                              "include": "source.js"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "begin": "\\G",
                      "end": "(?ix:\n\t\t\t\t\t\t\t\t\t\t\t\t(?=>\t\t\t\t\t\t\t\t\t\t\t# Tag without type attribute\n\t\t\t\t\t\t\t\t\t\t\t\t  | type(?=[\\s=])\n\t\t\t\t\t\t\t\t\t\t\t\t  \t(?!\\s*=\\s*\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t(\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t''\t\t\t\t\t\t\t\t# Empty\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t  | \"\"\t\t\t\t\t\t\t\t\t#   Values\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t  | ('|\"|)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t(\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext/\t\t\t\t\t\t\t# Text mime-types\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t(\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tjavascript(1\\.[0-5])?\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  | x-javascript\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  | jscript\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  | livescript\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  | (x-)?ecmascript\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  | babel\t\t\t\t\t\t# Javascript variant currently\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  \t\t\t\t\t\t\t\t#   recognized as such\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  \t)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  | application/\t\t\t\t\t# Application mime-types\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  \t(\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t(x-)?javascript\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  | (x-)?ecmascript\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  | module\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t  \t)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t[\\s\"'>]\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t\t)",
                      "name": "meta.tag.metadata.script.start.html",
                      "patterns": [
                        {
                          "include": "#attribute"
                        }
                      ]
                    },
                    {
                      "begin": "(?ix:\n\t\t\t\t\t\t\t\t\t\t\t\t(?=\n\t\t\t\t\t\t\t\t\t\t\t\t\ttype\\s*=\\s*\n\t\t\t\t\t\t\t\t\t\t\t\t\t('|\"|)\n\t\t\t\t\t\t\t\t\t\t\t\t\ttext/\n\t\t\t\t\t\t\t\t\t\t\t\t\t(\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tx-handlebars\n\t\t\t\t\t\t\t\t\t\t\t\t\t  | (x-(handlebars-)?|ng-)?template\n\t\t\t\t\t\t\t\t\t\t\t\t\t  | html\n\t\t\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t\t\t\t[\\s\"'>]\n\t\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t\t)",
                      "end": "((<))(?=/(?i:script))",
                      "endCaptures": {
                        "0": {
                          "name": "meta.tag.metadata.script.end.html"
                        },
                        "1": {
                          "name": "punctuation.definition.tag.begin.html"
                        },
                        "2": {
                          "name": "text.html.basic"
                        }
                      },
                      "patterns": [
                        {
                          "begin": "\\G",
                          "end": "(>)",
                          "endCaptures": {
                            "1": {
                              "name": "punctuation.definition.tag.end.html"
                            }
                          },
                          "name": "meta.tag.metadata.script.start.html",
                          "patterns": [
                            {
                              "include": "#attribute"
                            }
                          ]
                        },
                        {
                          "begin": "(?!\\G)",
                          "end": "(?=</(?i:script))",
                          "name": "text.html.basic",
                          "patterns": [
                            {
                              "include": "text.html.basic"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "begin": "(?=(?i:type))",
                      "end": "(<)(?=/(?i:script))",
                      "endCaptures": {
                        "0": {
                          "name": "meta.tag.metadata.script.end.html"
                        },
                        "1": {
                          "name": "punctuation.definition.tag.begin.html"
                        }
                      },
                      "patterns": [
                        {
                          "begin": "\\G",
                          "end": "(>)",
                          "endCaptures": {
                            "1": {
                              "name": "punctuation.definition.tag.end.html"
                            }
                          },
                          "name": "meta.tag.metadata.script.start.html",
                          "patterns": [
                            {
                              "include": "#attribute"
                            }
                          ]
                        },
                        {
                          "begin": "(?!\\G)",
                          "end": "(?=</(?i:script))",
                          "name": "source.unknown"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "begin": "(?i)(<)(base|link|meta)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": "/?>",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.metadata.$2.void.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)(noscript|title)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.metadata.$2.start.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(</)(noscript|title)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.metadata.$2.end.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)(col|hr|input)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": "/?>",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.structure.$2.void.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)(address|article|aside|blockquote|body|button|caption|colgroup|datalist|dd|details|dialog|div|dl|dt|fieldset|figcaption|figure|footer|form|head|header|hgroup|html|h[1-6]|label|legend|li|main|map|menu|meter|nav|ol|optgroup|option|output|p|pre|progress|section|select|slot|summary|table|tbody|td|template|textarea|tfoot|th|thead|tr|ul)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.structure.$2.start.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(</)(address|article|aside|blockquote|body|button|caption|colgroup|datalist|dd|details|dialog|div|dl|dt|fieldset|figcaption|figure|footer|form|head|header|hgroup|html|h[1-6]|label|legend|li|main|map|menu|meter|nav|ol|optgroup|option|output|p|pre|progress|section|select|slot|summary|table|tbody|td|template|textarea|tfoot|th|thead|tr|ul)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.structure.$2.end.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)(area|br|wbr)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": "/?>",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.inline.$2.void.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)(a|abbr|b|bdi|bdo|cite|code|data|del|dfn|em|i|ins|kbd|mark|q|rp|rt|ruby|s|samp|small|span|strong|sub|sup|time|u|var)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.inline.$2.start.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(</)(a|abbr|b|bdi|bdo|cite|code|data|del|dfn|em|i|ins|kbd|mark|q|rp|rt|ruby|s|samp|small|span|strong|sub|sup|time|u|var)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.inline.$2.end.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)(embed|img|param|source|track)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": "/?>",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.object.$2.void.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)(audio|canvas|iframe|object|picture|video)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.object.$2.start.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(</)(audio|canvas|iframe|object|picture|video)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.object.$2.end.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)((basefont|isindex))(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "invalid.deprecated.html"
            }
          },
          "end": "/?>",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.metadata.$2.void.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)((center|frameset|noembed|noframes))(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "invalid.deprecated.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.structure.$2.start.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(</)((center|frameset|noembed|noframes))(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "invalid.deprecated.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.structure.$2.end.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)((acronym|big|blink|font|strike|tt|xmp))(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "invalid.deprecated.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.inline.$2.start.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(</)((acronym|big|blink|font|strike|tt|xmp))(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "invalid.deprecated.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.inline.$2.end.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)((frame))(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "invalid.deprecated.html"
            }
          },
          "end": "/?>",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.object.$2.void.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)((applet))(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "invalid.deprecated.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.object.$2.start.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(</)((applet))(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "invalid.deprecated.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.object.$2.end.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(<)((dir|keygen|listing|menuitem|plaintext|spacer))(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "invalid.illegal.no-longer-supported.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.other.$2.start.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(?i)(</)((dir|keygen|listing|menuitem|plaintext|spacer))(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            },
            "3": {
              "name": "invalid.illegal.no-longer-supported.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.other.$2.end.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "include": "#math"
        },
        {
          "include": "#svg"
        },
        {
          "begin": "(<)([a-zA-Z][.0-9_a-zA-Z\\x{00B7}\\x{00C0}-\\x{00D6}\\x{00D8}-\\x{00F6}\\x{00F8}-\\x{037D}\\x{037F}-\\x{1FFF}\\x{200C}-\\x{200D}\\x{203F}-\\x{2040}\\x{2070}-\\x{218F}\\x{2C00}-\\x{2FEF}\\x{3001}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFFD}\\x{10000}-\\x{EFFFF}]*-[\\-.0-9_a-zA-Z\\x{00B7}\\x{00C0}-\\x{00D6}\\x{00D8}-\\x{00F6}\\x{00F8}-\\x{037D}\\x{037F}-\\x{1FFF}\\x{200C}-\\x{200D}\\x{203F}-\\x{2040}\\x{2070}-\\x{218F}\\x{2C00}-\\x{2FEF}\\x{3001}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFFD}\\x{10000}-\\x{EFFFF}]*)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": "/?>",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.custom.start.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        },
        {
          "begin": "(</)([a-zA-Z][.0-9_a-zA-Z\\x{00B7}\\x{00C0}-\\x{00D6}\\x{00D8}-\\x{00F6}\\x{00F8}-\\x{037D}\\x{037F}-\\x{1FFF}\\x{200C}-\\x{200D}\\x{203F}-\\x{2040}\\x{2070}-\\x{218F}\\x{2C00}-\\x{2FEF}\\x{3001}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFFD}\\x{10000}-\\x{EFFFF}]*-[\\-.0-9_a-zA-Z\\x{00B7}\\x{00C0}-\\x{00D6}\\x{00D8}-\\x{00F6}\\x{00F8}-\\x{037D}\\x{037F}-\\x{1FFF}\\x{200C}-\\x{200D}\\x{203F}-\\x{2040}\\x{2070}-\\x{218F}\\x{2C00}-\\x{2FEF}\\x{3001}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFFD}\\x{10000}-\\x{EFFFF}]*)(?=\\s|/?>)",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.tag.begin.html"
            },
            "2": {
              "name": "entity.name.tag.html"
            }
          },
          "end": ">",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.tag.end.html"
            }
          },
          "name": "meta.tag.custom.end.html",
          "patterns": [
            {
              "include": "#attribute"
            }
          ]
        }
      ]
    },
    "xml-processing": {
      "begin": "(<\\?)(xml)",
      "captures": {
        "1": {
          "name": "punctuation.definition.tag.html"
        },
        "2": {
          "name": "entity.name.tag.html"
        }
      },
      "end": "(\\?>)",
      "name": "meta.tag.metadata.processing.xml.html",
      "patterns": [
        {
          "include": "#attribute"
        }
      ]
    }
  }
}