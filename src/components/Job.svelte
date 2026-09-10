<script>
    import { aboutMe } from '../../data/about'
    import DOMPurify from 'dompurify'
    import { marked } from 'marked'

    const renderMarkdown = (content) => DOMPurify.sanitize(marked.parseInline(content))
</script>

<div class="job-title">
    <div>{aboutMe.title}</div>
    <div class="techs">{aboutMe.subtitle}</div>
    <code class="about-code">
    <span class="declaration">
        <span class="syntax-keyword">const</span>
        <span class="syntax-constant">aboutMe</span><span class="syntax-punctuation">:</span>
        <span class="syntax-type">Array</span><span class="syntax-type-parameter">&lt;string&gt;</span> 
        <span class="syntax-operator">=</span> 
        <span class="syntax-punctuation">[</span>
    </span>
    {#each aboutMe.summary as paragraph}
        <span class="summary">
            <span class="syntax-string">"</span>{@html renderMarkdown(paragraph)}<span class="syntax-string">"</span><span class="syntax-punctuation syntax-structure">,</span>
        </span>
    {/each}
    <span class="syntax-punctuation syntax-structure">]</span><span class="syntax-punctuation syntax-structure">;</span>
    </code>
</div>

<style>
    .about-code {
        display: block;
        margin-top: 1.5em;
        font-size: .75rem;
        font-weight: 300;
        color: #383a42;
        font-family: "Cascadia Code", "SFMono-Regular", Consolas, monospace;
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

    .syntax-type-parameter,
    .syntax-string {
        color: #50a14f;
    }

    .syntax-operator,
    .syntax-punctuation {
        color: #383a42;
    }

    .summary .syntax-string {
        font-weight: 700;
    }
</style>
