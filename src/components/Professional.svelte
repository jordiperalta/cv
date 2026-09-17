<script>
    import { experienceData } from '../../data/experience'
    import { aboutMe } from '../../data/professional'
    import DOMPurify from 'dompurify'
    import { marked } from 'marked'

    const markdownRenderer = new marked.Renderer()
    const renderLink = markdownRenderer.link.bind(markdownRenderer)

    markdownRenderer.link = (token) => renderLink(token).replace(
        '<a ',
        '<a target="_blank" rel="noopener noreferrer" '
    )

    const renderMarkdown = (content) => DOMPurify.sanitize(
        marked.parseInline(content, { renderer: markdownRenderer }),
        { ADD_ATTR: ['target', 'rel'] }
    )

    const isPresent = (time) => time === 'Present';
    const experienceLimit = 2;
</script>

    <div class="professional">
        <div class="professional-title">{aboutMe.title}</div>
        <div class="techs">{aboutMe.subtitle}</div>
        <div class="professional-code-stack">
        <code class="professional-code-copy">
            <div class="code-content">
            <div class="experience-definition">
            <div class="declaration experience-types">
                <span class="declaration">
                    <span class="syntax-keyword">type</span>
                    <span class="syntax-constant">Time</span>
                    <span class="syntax-operator">=</span>
                    <span class="syntax-type-parameter">Date</span>
                    <span class="syntax-punctuation syntax-bracket">|</span>
                    <span class="syntax-quote">'</span><span class="syntax-string-content">Present</span><span class="syntax-quote">'</span><span class="syntax-punctuation syntax-structure">;</span>
                </span>
                <br/>
                <span class="declaration">
                    <span class="syntax-keyword">type</span>
                    <span class="syntax-constant">Period</span>
                    <span class="syntax-operator">=</span>
                    <span class="syntax-punctuation syntax-bracket">[</span><span class="syntax-type-parameter">Time</span>,
                    <span class="syntax-type-parameter">Time</span><span class="syntax-punctuation syntax-bracket">]</span><span class="syntax-punctuation syntax-structure">;</span>
                </span>
                <br/>
                <span class="declaration">
                    <span class="syntax-keyword">type</span>
                    <span class="syntax-constant">Description</span>
                    <span class="syntax-operator">=</span>
                    <span class="syntax-type">Array</span><span class="syntax-type-parameter">&lt;string&gt;</span><span class="syntax-punctuation syntax-structure">;</span>
                </span>
            </div>
            <div class="declaration interface-experience">
                <span class="syntax-keyword">interface</span>
                <span class="syntax-constant">Experience</span>
                <span class="syntax-punctuation syntax-bracket">&lbrace;</span>
                <br />
                <div class="indentation">
                    company:
                    <span class="syntax-type-parameter">string</span>;
                    <br />
                    job:
                    <span class="syntax-type-parameter">string</span>;
                    <br />
                    period:
                    <span class="syntax-type-parameter">Period</span>;
                    <br />
                    mainTasks:
                    <span class="syntax-type-parameter">Description</span>;
                    <br />
                </div>
                <span class="syntax-punctuation syntax-bracket">&rbrace;</span>
            </div>
            </div>
            <br/>
            <span class="declaration">
                <span class="syntax-keyword">const</span>
                <span class="syntax-constant">professionalExp</span><span class="syntax-punctuation">:</span>
                <span class="syntax-type">Set</span><span class="syntax-type-parameter">&lt;Experience&gt;</span> 
                <span class="syntax-operator">=</span> 
                <span class="syntax-keyword">new</span>
                <span class="syntax-constant">Set</span><span class="syntax-punctuation syntax-bracket">()</span><span class="syntax-punctuation">;</span>
            </span>
            <br/><br/>
            <span class="declaration">
                <span class="syntax-keyword">const</span>
                <span class="syntax-constant">aboutMe</span><span class="syntax-punctuation">:</span>
                <span class="syntax-type-parameter">Description</span> 
                <span class="syntax-operator">=</span> 
                <span class="syntax-punctuation syntax-bracket">[</span>
            </span>
            {#each aboutMe.summary as paragraph}
                <span class="summary">
                    <span class="syntax-quote">"</span><span class="syntax-string-content">{@html renderMarkdown(paragraph)}</span><span class="syntax-quote">"</span><span class="syntax-punctuation syntax-structure">,</span>
                </span>
            {/each}
            <span class="syntax-punctuation syntax-structure syntax-bracket">]</span><span class="syntax-punctuation syntax-structure">;</span>
            <br /><br />
            <span class="declaration">
            {#each experienceData.slice(0, experienceLimit) as experience}
                <span class="syntax-constant">professionalExp.add</span><span class="syntax-punctuation syntax-bracket">(</span><span class="syntax-keyword">&lbrace;</span>
                <div class="indentation">
                    company:
                    <span class="syntax-quote">'</span><span class="syntax-string-content">{experience.entity}</span><span class="syntax-quote">'</span>,
                    <br />
                    job:
                    <span class="syntax-quote">'</span><span class="syntax-string-content">{experience.title}</span><span class="syntax-quote">'</span>,
                    <br />
                    period:
                    {#if isPresent(experience.periods[0].startDate)}
                        <span class="syntax-quote">'</span><span class="syntax-string-content">Present</span><span class="syntax-quote">'</span>
                    {:else}
                        <span class="syntax-type-parameter">[</span><span class="syntax-keyword">new</span>
                        <span class="syntax-constant">Date</span><span class="syntax-constant">(</span><span class="syntax-quote">'</span><span class="syntax-string-content">{experience.periods[0].startDate}</span><span class="syntax-quote">'</span><span class="syntax-constant">)</span>
                    {/if},
                    {#if isPresent(experience.periods[0].endDate)}
                        <span class="syntax-quote">'</span><span class="syntax-string-content">Present</span><span class="syntax-quote">'</span>
                    {:else}
                        <span class="syntax-keyword">new</span>
                        <span class="syntax-constant">Date</span><span class="syntax-constant">(</span><span class="syntax-quote">'</span><span class="syntax-string-content">{experience.periods[0].endDate}</span><span class="syntax-quote">'</span><span class="syntax-constant">)</span>
                    {/if}<span class="syntax-type-parameter">]</span>,
                    <br />
                    mainTasks:
                    <span class="syntax-type-parameter">[</span>
                    {#each experience.mainTasks as paragraph}
                        <span class="summary">
                            <span class="syntax-quote">"</span><span class="syntax-string-content">{@html renderMarkdown(paragraph)}</span><span class="syntax-quote">"</span><span class="syntax-punctuation syntax-structure">,</span>
                        </span>
                    {/each}
                    <span class="syntax-type-parameter">]</span>,
                </div>
                <span class="syntax-keyword">&rbrace;</span><span class="syntax-punctuation syntax-bracket">)</span>;
                <br /><br />
            {/each}
            </span>
            </div>
        </code>
        <code class="professional-code" aria-hidden="true"></code>
    </div>
</div>

<style>
    .professional {
        flex: 1 1 0;
        min-width: 0;
        position: relative;
        margin: 4.35rem .5rem 0;
        font-size: 1.25rem;
        line-height: 1.2;
    }

    .professional > div.professional-title {
        color: #fff;
        background: linear-gradient(40deg, #08714f 0%, #08714f 67%, #47b481 80%, #fff 88.25%);
        width: 650px;
        margin-left: -284px;
        padding: 5px 0 7px 285px;
    }

    .professional .techs {
        margin: .3125rem .125em;
        font-size: .875rem;
        font-weight: 600;
        color: #08714f;
    }

    .professional-code-stack {
        position: absolute;
        right: -8px;
        bottom: 0;
        left: -20px;
    }

    .professional code {
        display: block;
        font-size: .7rem;
        font-weight: 400;
        height: 842px;
        margin: 0;
        padding: 12px 16px;
        user-select: none;
        overflow: hidden;
        border-radius: 16px;
    }

    .professional-code {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background-color: #e3e6ed;
        border: #b3c0d0 2px solid;
        border-top: #b3c0d0 12px solid;
    }

    .professional-code-copy {
        position: relative;
        z-index: 2;
        background-color: transparent;
        border: transparent 2px solid;
        border-top: transparent 12px solid;
        transition: color 350ms ease,
            background-color 700ms ease,
            border 300ms ease,
            border-top 300ms ease,
            z-index 0s linear 700ms;
    }

    .professional-code-copy:hover {
        z-index: 40;
        background-color: #283547;
        border: #b3c0d0 2px solid;
        border-top: #b3c0d0 12px solid;
        transition: color 350ms ease,
            background-color 700ms ease,
            border 350ms ease,
            border-top 350ms ease,
            z-index 0s;
    }

    .professional-code-copy::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 12ch;
        border-left: 1px solid #485e883f;
        pointer-events: none;
        transition: border-color 350ms ease;
    }

    .professional-code-copy:hover::before {
        border-color: #93c5fd3f;
    }

    .code-content {
        width: calc(100% / .875);
        transform: scaleX(.875);
        transform-origin: top left;
    }

    .experience-definition {
        display: flex;
        justify-content: space-between;
        gap: .25rem;
    }

    .interface-experience {
        order: -1;
    }

    .experience-types {
        width: 57.5%;
        text-align: left;
    }

    .summary {
        display: block;
        padding-left: 1.125em;
        margin-top: .375em;
    }

    .declaration {
        font-weight: 700;
    }

    .syntax-structure {
        font-weight: 700;
    }

    .syntax-keyword {
        color: #a626a4;
    }

    .syntax-constant {
        color: #4078f2;
    }

    .syntax-type {
        color: #c18401;
    }

    .syntax-type-parameter {
        color: #50a14f;
    }

    .syntax-operator,
    .syntax-punctuation {
        color: #383a42;
    }

    .syntax-bracket {
        color: #1d895f;
    }

    .syntax-string-content {
        color: #284b71;
    }

    .summary .syntax-quote {
        font-weight: 700;
        color: #1f4b7a;
    }

    .indentation {
        padding-left: 16px;
    }

    .indentation .syntax-string-content {
        font-weight: 400;
    }

    .professional-code-copy .syntax-operator,
    .professional-code-copy .syntax-punctuation,
    .professional-code-copy .syntax-string-content,
    .professional-code-copy .syntax-quote {
        transition: color 350ms ease;
    }

    .professional-code-copy:hover {
        color: #f8fafc;
    }

    .professional-code-copy:hover .syntax-operator,
    .professional-code-copy:hover .syntax-punctuation:not(.syntax-bracket) {
        color: #d1d5db;
    }

    .professional-code-copy:hover .syntax-string-content,
    .professional-code-copy:hover .summary .syntax-quote {
        color: #93c5fd;
    }

    .professional-code-copy:hover .syntax-keyword {
        color: #d657d4;
    }

    .professional-code-copy :global(a) {
        font-weight: 600;
        color: #3867aa;
        text-decoration: none;
        transition: color 350ms ease;
    }

    .professional-code-copy:hover :global(a) {
        color: #bcd2ec;
    }
</style>
