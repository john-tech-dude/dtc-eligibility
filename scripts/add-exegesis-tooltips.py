#!/usr/bin/env python3
"""Add targeted tooltips to dtc-biblical-exegesis.html per expansion strategy."""
from pathlib import Path

path = Path(__file__).resolve().parent.parent / 'docs' / 'dtc-biblical-exegesis.html'
html = path.read_text()

T = {
    'typology': ('Theological Concept', '&lt;em&gt;Typology&lt;/em&gt; — Reading earthly institutions as &quot;types&quot; or shadows of biblical patterns. This exegesis treats DTC as a typological fulfillment of covenant, tabernacle, and Tree-of-Life structures.'),
    'covenant_formulary': ('Ancient Treaty Structure', 'The six-part suzerain-vassal treaty form (preamble, historical prologue, stipulations, document clause, witnesses, blessings/curses). The Mosaic covenant and DTC documents both follow this Near Eastern pattern.'),
    'tetragrammaton': ('Divine Name', '&lt;em&gt;Tetragrammaton&lt;/em&gt; — The four-letter divine name YHWH (יהוה). Gematria: 10+5+6+5 = &lt;strong&gt;26&lt;/strong&gt;. In 2026 = 2000+26, the year bears the numerical seal of the Name.'),
    'yhwh_heb': ('Divine Name', 'יהוה — &lt;em&gt;YHWH&lt;/em&gt;, the Tetragrammaton (&quot;HaShem&quot;). Gematria: י(10)+ה(5)+ו(6)+ה(5) = &lt;strong&gt;26&lt;/strong&gt;. The unpronounced four-letter Name at the center of covenant theology.'),
    'yod': ('Hebrew Letter', 'י — &lt;em&gt;Yod&lt;/em&gt;, the smallest letter. Gematria: &lt;strong&gt;10&lt;/strong&gt;. First letter of YHWH; corresponds to &lt;em&gt;Atzilut&lt;/em&gt; (Emanation) and Eligibility Questionnaire Section I.'),
    'heh': ('Hebrew Letter', 'ה — &lt;em&gt;Heh&lt;/em&gt;, &quot;breath/window.&quot; Gematria: &lt;strong&gt;5&lt;/strong&gt;. Appears twice in YHWH; corresponds to &lt;em&gt;Beriah&lt;/em&gt; and &lt;em&gt;Assiyah&lt;/em&gt; in the Four Worlds.'),
    'vav': ('Hebrew Letter', 'ו — &lt;em&gt;Vav&lt;/em&gt;, &quot;hook/connector.&quot; Gematria: &lt;strong&gt;6&lt;/strong&gt;. Third letter of YHWH; the connector between heaven and earth. Central to the Broken Vav typology.'),
    'tav_heb': ('Hebrew Letter', 'ת — &lt;em&gt;Tav&lt;/em&gt;, final alphabet letter, &quot;seal.&quot; Gematria: &lt;strong&gt;400&lt;/strong&gt;. Opens the Hebrew year תשפ&quot;ו (5786).'),
    'shin': ('Hebrew Letter', 'ש — &lt;em&gt;Shin&lt;/em&gt;, &quot;tooth/flame.&quot; Gematria: &lt;strong&gt;300&lt;/strong&gt;. Second letter of תשפ&quot;ו; one of three mother letters in Kabbalah.'),
    'peh': ('Hebrew Letter', 'פ — &lt;em&gt;Peh&lt;/em&gt;, &quot;mouth.&quot; Gematria: &lt;strong&gt;80&lt;/strong&gt;. Third letter of תשפ&quot;ו; speech and revelation.'),
    'teshuva': ('Hebrew Year', 'תשפ&quot;ו — Hebrew year 5786 (2025–2026). Tav-Shin-Peh-Vav; suffix gematria 786, digit sum 21 = &lt;em&gt;Ehyeh&lt;/em&gt; (I AM).'),
    'la_prat_katan': ('Gematria Method', '&lt;em&gt;La-prat katan&lt;/em&gt; — &quot;the small remainder.&quot; Hebrew year gematria method that sets aside millennia and computes only the year suffix (e.g., 786 for תשפ&quot;ו).'),
    'ehyeh_inline': ('Divine Name', 'אהיה — &lt;em&gt;Ehyeh&lt;/em&gt;, &quot;I AM / I Will Be.&quot; Revealed at the burning bush (Exodus 3:14). Gematria: &lt;strong&gt;21&lt;/strong&gt;. Digit sum of תשפ&quot;ו.'),
    'el': ('Divine Name', 'אל — &lt;em&gt;El&lt;/em&gt;, primordial name for God (&quot;Mighty One&quot;). Gematria: &lt;strong&gt;31&lt;/strong&gt;. 21 (Ehyeh) + 10 (Decalogue) = 31.'),
    'typological': ('Theological Concept', '&lt;em&gt;Typological&lt;/em&gt; — Interpreting historical patterns as foreshadowing deeper covenant structures. 2026 = 2000+26 is read as a typological composite of millennium and divine Name.'),
    'pts': ('DTC System', '&lt;strong&gt;Participant Terminal System (PTS).&lt;/strong&gt; DTC&apos;s electronic gateway for Participants. SR-DTC-2026-001 restricted PTS access — fortifying the inner court threshold.'),
    'ofac': ('Regulatory Framework', '&lt;strong&gt;Office of Foreign Assets Control.&lt;/strong&gt; U.S. Treasury sanctions enforcement. DTC&apos;s 2026 OFAC Compliance Framework — the absolute boundary separating profane from sacred ledger.'),
    'chiasmus': ('Literary Structure', '&lt;em&gt;Chiasmus&lt;/em&gt; — Mirror structure A-B-C-D-C′-B′-A′. The center is the theological fulcrum, not the chronological middle. Fundamental to biblical Hebrew composition.'),
    'closing': ('DTC Process', 'The &lt;strong&gt;Closing&lt;/strong&gt; — The irreversible transfer at 3:00 p.m. ET. Theological fulcrum of the DTC chiasm: divides a security&apos;s life into preparation and aftermath.'),
    'keter': ('Kabbalistic Sefirah', '&lt;em&gt;Keter&lt;/em&gt; (Crown) — Highest sefirah; divine will. In DTC: the One Certificate — singular registered instrument at the apex of custody.'),
    'chesed': ('Kabbalistic Sefirah', '&lt;em&gt;Chesed&lt;/em&gt; (Lovingkindness/Mercy) — Expansive grace. In DTC: FAST Program and credit extension to issuers.'),
    'gevurah': ('Kabbalistic Sefirah', '&lt;em&gt;Gevurah&lt;/em&gt; (Strength/Judgment) — Restraint and discipline. In DTC: fines, suspension, and compliance enforcement.'),
    'tiferet': ('Kabbalistic Sefirah', '&lt;em&gt;Tiferet&lt;/em&gt; (Beauty/Balance) — Harmony of mercy and judgment. In DTC: Cede &amp; Co. and the Participant&apos;s balanced market function.'),
    'malkhut': ('Kabbalistic Sefirah', '&lt;em&gt;Malkhut&lt;/em&gt; (Kingdom/Sovereignty) — Divine immanence in creation. In DTC: the Beneficial Owner — ultimate economic holder.'),
    'yesod': ('Kabbalistic Sefirah', '&lt;em&gt;Yesod&lt;/em&gt; (Foundation) — Conduit channeling blessing downward. In DTC: the Participant — required intermediary to custody.'),
    'participant': ('Financial Term', 'A &lt;strong&gt;DTC Participant&lt;/strong&gt; — licensed member firm maintaining securities accounts and accessing DTC services. Mediates between Cede &amp; Co. and beneficial owners; corresponds to &lt;em&gt;Yesod&lt;/em&gt; and the priestly class.'),
    'atzilut': ('Kabbalistic World', '&lt;em&gt;Atzilut&lt;/em&gt; (Emanation) — World of pure divine light. Yod-letter realm. Eligibility Questionnaire Section I: &quot;Who are you?&quot;'),
    'beriah': ('Kabbalistic World', '&lt;em&gt;Beriah&lt;/em&gt; (Creation) — World of archetypal forms. First Heh-letter realm. Section II: &quot;What are you offering?&quot;'),
    'yetzirah': ('Kabbalistic World', '&lt;em&gt;Yetzirah&lt;/em&gt; (Formation) — World of angels and formation. Vav-letter realm. Section III: &quot;What do you promise?&quot;'),
    'assiyah': ('Kabbalistic World', '&lt;em&gt;Assiyah&lt;/em&gt; (Action) — World of material deed. Final Heh-letter realm. Section IV: &quot;Will you swear?&quot; — the signing act.'),
    'four_worlds': ('Kabbalistic Concept', '&lt;em&gt;Four Worlds&lt;/em&gt; (&lt;em&gt;Arba Olamot&lt;/em&gt;) — Descending realms: Atzilut, Beriah, Yetzirah, Assiyah. Each maps to a letter of YHWH and a section of the Eligibility Questionnaire.'),
    'chol': ('Hebrew Term', '&lt;em&gt;Chol&lt;/em&gt; — the profane or ordinary (non-sacred) realm. When the 3:00 p.m. deadline is missed, settlement remains in &lt;em&gt;chol&lt;/em&gt; rather than achieving the &lt;em&gt;Yah&lt;/em&gt;-form.'),
    'yah': ('Divine Name', '&lt;em&gt;Yah&lt;/em&gt; (יה) — abbreviated divine name. Gematria: 10+5 = &lt;strong&gt;15&lt;/strong&gt;. Vav(6) + Ninth Hour(9) = 15: achieved when the daily deadline is met.'),
    'hora_nona': ('Biblical Time', '&lt;em&gt;Hora nona&lt;/em&gt; — Latin/Roman &quot;ninth hour&quot; (approx. 3:00 p.m.). Mark 15:34: crucifixion at the ninth hour. DTC income-payment deadline enacts the same surrender-before-distribution logic.'),
    'rule_144a': ('SEC Regulation', '&lt;strong&gt;Rule 144A&lt;/strong&gt; — SEC exemption for private placement securities to qualified institutional buyers. Creates a &quot;sealed community&quot; — typologically parallel to 144 (12²).'),
    'revelation': ('Biblical Book', '&lt;em&gt;Revelation&lt;/em&gt; — Final book of the New Testament. 144,000 sealed (12,000 × 12 tribes) symbolizes complete divine government — the covenant square.'),
    'holiness_code': ('Biblical Section', 'The &lt;em&gt;Holiness Code&lt;/em&gt; (Leviticus 17–26) — central chiastic section of Leviticus defining ritual and ethical holiness for Israel.'),
    'one_certificate': ('DTC Concept', 'The &lt;strong&gt;One Certificate&lt;/strong&gt; — single nominee-held certificate in book-entry form. Corresponds to the Ark&apos;s singular covenant tablets and &lt;em&gt;Keter&lt;/em&gt; on the Tree of Life.'),
    'kohen': ('Biblical Office', '&lt;em&gt;Kohen&lt;/em&gt; (Priest) — highest mediating office in Israel. In DTC triad: DTCC (1775) — sovereign clearing authority.'),
    'levi': ('Biblical Office', '&lt;em&gt;Levi&lt;/em&gt; (Levite) — ministering tribe serving the sanctuary. In DTC triad: DTC full name (1412) — operational depository.'),
    'yisrael': ('Biblical Office', '&lt;em&gt;Yisrael&lt;/em&gt; (Israelite) — covenant beneficiary. In DTC triad: Cede &amp; Co. (1354) — nominee yielding claim for beneficial owners.'),
    'triadic_covenant_heb': ('Hebrew Term', 'הַבְּרִית הַשְּׁלִישִׁיָּה — &lt;em&gt;HaBrit HaShlishiyah&lt;/em&gt;, &quot;The Triadic Covenant.&quot; The three-entity gematria structure of DTC, DTCC, and Cede &amp; Co.'),
    'numerical_concordance_heb': ('Hebrew Term', 'הַתַּאֲמָה הַמִּסְפָּרִית — &lt;em&gt;HaTa&apos;amah HaMisparit&lt;/em&gt;, &quot;Numerical Concordance.&quot; The appendix mapping of covenant numbers to DTC correspondences.'),
    'melech_hamashiach': ('Hebrew Term', 'מלך המשיח — &lt;em&gt;Melech HaMashiach&lt;/em&gt;, &quot;King Messiah.&quot; Gematria: &lt;strong&gt;453&lt;/strong&gt; = Emet(441) + 12 (government). Truth plus divine government.'),
    'lurianic': ('Kabbalistic School', '&lt;em&gt;Lurianic Kabbalah&lt;/em&gt; — Isaac Luria&apos;s mystical system (16th c.). Holds that divine structures manifest unconsciously through available historical forms — strongest reading of DTC&apos;s archetypal recurrence.'),
    'chet': ('Hebrew Letter', 'ח — &lt;em&gt;Chet&lt;/em&gt;, eighth letter. Gematria: &lt;strong&gt;8&lt;/strong&gt;. With Yod(10) forms &lt;em&gt;Chai&lt;/em&gt; (18) — life.'),
    '453': ('Numerological Concept', '&lt;strong&gt;453&lt;/strong&gt; = Emet(441) + 12. Gematria of &lt;em&gt;Melech HaMashiach&lt;/em&gt; — Truth crowned with governmental perfection (12 tribes).'),
    'beneficial_owners': ('DTC Role', '&lt;strong&gt;Beneficial Owners&lt;/strong&gt; — ultimate economic holders of securities. Registered in Cede &amp; Co.&apos;s name, mediated through Participants; correspond to the faithful known through the mediator.'),
    'redemption_row': ('DTC Process', '&lt;strong&gt;Redemption&lt;/strong&gt; — recall of issued securities. Chiastic B′/D′ mirror of CUSIP assignment and delivery; typologically parallel to salvation as calling-back.'),
    'shakan': ('Hebrew Root', '&lt;em&gt;Shakan&lt;/em&gt; (שכן) — &quot;to dwell.&quot; Root of &lt;em&gt;Mishkan&lt;/em&gt; (Tabernacle) and &lt;em&gt;Shekinah&lt;/em&gt; (divine presence).'),
}


def t(key, text=None, extra_class=''):
    title, body = T[key]
    cls = 'tooltip-trigger' + (f' {extra_class}' if extra_class else '')
    label = text if text is not None else key
    return f'<span class="{cls}" data-tooltip-title="{title}" data-tooltip="{body}">{label}</span>'


def heb(key, char, extra='inline-hebrew'):
    title, body = T[key]
    return f'<span class="{extra} tooltip-trigger" data-tooltip-title="{title}" data-tooltip="{body}">{char}</span>'


pairs = [
    ('Kabbalistic typology, and the ancient Near Eastern covenant formulary.',
     f'Kabbalistic {t("typology", "typology")}, and the ancient Near Eastern {t("covenant_formulary", "covenant formulary")}.'),

    ('The gematria of the divine name <span class="inline-hebrew">יהוה</span> (YHWH, the Tetragrammaton) is <span class="inline-hebrew">י</span> (10) + <span class="inline-hebrew">ה</span> (5) + <span class="inline-hebrew">ו</span> (6) + <span class="inline-hebrew">ה</span> (5) = 26.',
     f'The gematria of the divine name {heb("yhwh_heb", "יהוה")} (YHWH, the {t("tetragrammaton", "Tetragrammaton")}) is {heb("yod", "י")} (10) + {heb("heh", "ה")} (5) + {heb("vav", "ו")} (6) + {heb("heh", "ה")} (5) = 26.'),

    ('The year splits into a perfect typological composite:',
     f'The year splits into a perfect {t("typological", "typological")} composite:'),

    ('written textually as <span class="inline-hebrew">תשפ"ו</span> (Tav-Shin-Pe-Vav). In traditional computation, the millennia are set aside (<em>la-prat katan</em>), leaving the base value of the year\'s suffix: <span class="inline-hebrew">ת</span> (400) + <span class="inline-hebrew">ש</span> (300) + <span class="inline-hebrew">פ</span> (80) + <span class="inline-hebrew">ו</span> (6) = 786.',
     'written textually as ' + heb('teshuva', 'תשפ"ו') + ' (Tav-Shin-Pe-Vav). In traditional computation, the millennia are set aside (<em class="tooltip-trigger" data-tooltip-title="' + T['la_prat_katan'][0] + '" data-tooltip="' + T['la_prat_katan'][1] + '">la-prat katan</em>), leaving the base value of the year\'s suffix: ' + heb('tav_heb', 'ת') + ' (400) + ' + heb('shin', 'ש') + ' (300) + ' + heb('peh', 'פ') + ' (80) + ' + heb('vav', 'ו') + ' (6) = 786.'),

    ('The number 21 is the gematria of <span class="inline-hebrew">אהיה</span> (<em>Ehyeh</em>, "I AM"), the ultimate name of divine potential revealed at the burning bush. When the cosmic potential of the Hebrew year (21) meets the structural execution of the global framework (10), they form the ultimate axis: 21 + 10 = 31, the gematria of <span class="inline-hebrew">אל</span> (<em>El</em>), the primordial singular Name for God.',
     f'The number 21 is the gematria of {heb("ehyeh_inline", "אהיה")} (<em>Ehyeh</em>, "I AM"), the ultimate name of divine potential revealed at the burning bush. When the cosmic potential of the Hebrew year (21) meets the structural execution of the global framework (10), they form the ultimate axis: 21 + 10 = 31, the gematria of {heb("el", "אל")} (<em>El</em>), the primordial singular Name for God.'),

    ('restricting access to the inner court of the Participant Terminal System.',
     f'restricting access to the inner court of the {t("pts", "Participant Terminal System")}.'),

    ('SR-DTC-2026-007 (OFAC Compliance Framework)',
     f'SR-DTC-2026-007 ({t("ofac", "OFAC")} Compliance Framework)'),

    ('the secular count yields the Decalogue (10) and the Tetragrammaton (26),',
     f'the secular count yields the Decalogue (10) and the {t("tetragrammaton", "Tetragrammaton")} (26),'),

    ('but the balance of Tiferet. The Participant is the institutional expression',
     f'but the balance of {t("tiferet", "Tiferet")}. The {t("participant", "Participant")} is the institutional expression'),

    ('extending credit (Chesed) to issuers and investors while maintaining compliance (Gevurah), to achieve the beauty (Tiferet)',
     f'extending credit ({t("chesed", "Chesed")}) to issuers and investors while maintaining compliance ({t("gevurah", "Gevurah")}), to achieve the beauty ({t("tiferet", "Tiferet")})'),

    ('From Keter (The One Certificate) to Malkhut (The Beneficial Owner)',
     f'From {t("keter", "Keter")} ({t("one_certificate", "The One Certificate")}) to {t("malkhut", "Malkhut")} (The Beneficial Owner)'),

    ('<p>Chiasmus — the literary structure A-B-C-D-C′-B′-A′ — is a defining feature',
     f'<p>{t("chiasmus", "Chiasmus")} — the literary structure A-B-C-D-C′-B′-A′ — is a defining feature'),

    ('with the holiness code at its center.',
     f'with the {t("holiness_code", "holiness code")} at its center.'),

    ('In the DTC chiasm, the Closing is this fulcrum:',
     f'In the DTC chiasm, the {t("closing", "Closing")} is this fulcrum:'),

    ('mediated through a Participant, under terms they did not negotiate.',
     f'mediated through a {t("participant", "Participant")}, under terms they did not negotiate.'),

    ('each corresponding to one letter of the Tetragrammaton.',
     f'each corresponding to one letter of the {t("tetragrammaton", "Tetragrammaton")}.'),

    ('The Kabbalistic doctrine of the <strong>Four Worlds</strong> (<em class="tooltip-trigger"',
     f'The Kabbalistic doctrine of the <strong>{t("four_worlds", "Four Worlds")}</strong> (<em class="tooltip-trigger"'),

    ('This is the question of essence prior to form: <strong>Atzilut</strong>, the world of pure divine light before differentiation. Section IV is the irreversible physical act of signing — the pen touches paper, the abstract becomes concrete, the covenant is activated: <strong>Assiyah</strong>.',
     f'This is the question of essence prior to form: <strong>{t("atzilut", "Atzilut")}</strong>, the world of pure divine light before differentiation. Section IV is the irreversible physical act of signing — the pen touches paper, the abstract becomes concrete, the covenant is activated: <strong>{t("assiyah", "Assiyah")}</strong>.'),

    ('In Roman timekeeping, this was the <em>hora nona</em> — the ninth hour.',
     f'In Roman timekeeping, this was the <em class="tooltip-trigger" data-tooltip-title="{T["hora_nona"][0]}" data-tooltip="{T["hora_nona"][1]}">hora nona</em> — the ninth hour.'),

    ('the daily transaction achieves <strong>6 + 9 = 15</strong>, the <em>Yah</em>-form of the Name. When the deadline is missed, the equation fails: 6 cannot reach 9, and the settlement remains in the realm of <em>chol</em> (the profane).',
     f'the daily transaction achieves <strong>6 + 9 = 15</strong>, the <em>{t("yah", "Yah")}</em>-form of the Name. When the deadline is missed, the equation fails: 6 cannot reach 9, and the settlement remains in the realm of <em class="tooltip-trigger" data-tooltip-title="{T["chol"][0]}" data-tooltip="{T["chol"][1]}">chol</em> (the profane).'),

    ('Limit Accessibility to DTC\'s Participant Terminal System</td>',
     f'Limit Accessibility to DTC\'s {t("pts", "Participant Terminal System")}</td>'),

    ('<td>OFAC Compliance Framework</td>',
     f'<td>{t("ofac", "OFAC")} Compliance Framework</td>'),

    ('is <span class="heb-inline">ח</span>(8) + <span class="heb-inline">י</span>(10) = <strong>18</strong>.',
     f'is <span class="heb-inline tooltip-trigger" data-tooltip-title="{T["chet"][0]}" data-tooltip="{T["chet"][1]}">ח</span>(8) + <span class="heb-inline tooltip-trigger" data-tooltip-title="{T["yod"][0]}" data-tooltip="{T["yod"][1]}">י</span>(10) = <strong>18</strong>.'),

    ('<td>Beneficial Owners</td>',
     f'<td>{t("beneficial_owners", "Beneficial Owners")}</td>'),

    ('<td>Redemption</td>\n          <td>The called-back security</td>',
     f'<td>{t("redemption_row", "Redemption")}</td>\n          <td>The called-back security</td>'),

    ('<span class="stage-heb-eye">הַבְּרִית הַשְּׁלִישִׁיָּה</span>',
     '<span class="stage-heb-eye tooltip-trigger" data-tooltip-title="' + T['triadic_covenant_heb'][0] + '" data-tooltip="' + T['triadic_covenant_heb'][1] + '">הַבְּרִית הַשְּׁלִישִׁיָּה</span>'),

    ('<span class="stage-heb-eye">הַתַּאֲמָה הַמִּסְפָּרִית</span>',
     '<span class="stage-heb-eye tooltip-trigger" data-tooltip-title="' + T['numerical_concordance_heb'][0] + '" data-tooltip="' + T['numerical_concordance_heb'][1] + '">הַתַּאֲמָה הַמִּסְפָּרִית</span>'),

    ('<strong>Kohen</strong> (Priest), <strong>Levi</strong> (Levite), and <strong>Yisrael</strong> (Israelite)',
     f'<strong>{t("kohen", "Kohen")}</strong> (Priest), <strong>{t("levi", "Levi")}</strong> (Levite), and <strong>{t("yisrael", "Yisrael")}</strong> (Israelite)'),

    ('<td>Kohen (Priest)</td>',
     f'<td>{t("kohen", "Kohen")} (Priest)</td>'),

    ('<td>Levi (Levite)</td>',
     f'<td>{t("levi", "Levi")} (Levite)</td>'),

    ('<td>Yisrael (Israelite)</td>',
     f'<td>{t("yisrael", "Yisrael")} (Israelite)</td>'),

    ('the number of Yesod (Foundation), the conduit',
     f'the number of {t("yesod", "Yesod")} (Foundation), the conduit'),

    ('In Revelation, 12,000 sealed from each of 12 tribes = 144,000.',
     f'In {t("revelation", "Revelation")}, 12,000 sealed from each of 12 tribes = 144,000.'),

    ('<td>Rule 144A, the sealed community</td>',
     f'<td>{t("rule_144a", "Rule 144A")}, the sealed community</td>'),

    ('<td>453</td>\n          <td><span class="td-heb">מלך המשיח</span></td>',
     '<td>' + t('453', '453') + '</td>\n          <td><span class="td-heb tooltip-trigger" data-tooltip-title="' + T['melech_hamashiach'][0] + '" data-tooltip="' + T['melech_hamashiach'][1] + '">מלך המשיח</span></td>'),

    ('This is, in the Lurianic reading, the strongest possible evidence',
     f'This is, in the {t("lurianic", "Lurianic")} reading, the strongest possible evidence'),

    ('from the root <em>shakan</em>, "to dwell") is the divine presence',
     'from the root <em class="tooltip-trigger" data-tooltip-title="' + T['shakan'][0] + '" data-tooltip="' + T['shakan'][1] + '">shakan</em>, "to dwell") is the divine presence'),

    ('<td>Participant-mediated only</td>',
     f'<td>{t("participant", "Participant")}-mediated only</td>'),

    ('<td><span class="td-heb">ד</span></td>\n          <td>Dalet — door, threshold</td>',
     '<td><span class="td-heb tooltip-trigger" data-tooltip-title="Hebrew Letter" data-tooltip="ד — &lt;em&gt;Dalet&lt;/em&gt;, &quot;Door&quot;. Gematria: &lt;strong&gt;4&lt;/strong&gt;. Threshold of the DTC system.">ד</span></td>\n          <td>Dalet — door, threshold</td>'),

    ('<td><span class="td-heb">כ</span></td>\n          <td>Kaf — hand, holding</td>',
     '<td><span class="td-heb tooltip-trigger" data-tooltip-title="Hebrew Letter" data-tooltip="כ — &lt;em&gt;Kaf&lt;/em&gt;, &quot;Palm/Hand&quot;. Gematria: &lt;strong&gt;20&lt;/strong&gt;. Custody function.">כ</span></td>\n          <td>Kaf — hand, holding</td>'),

    ('<td><span class="td-heb">ת</span></td>\n          <td>Tav — seal, mark</td>',
     '<td><span class="td-heb tooltip-trigger" data-tooltip-title="Hebrew Letter" data-tooltip="ת — &lt;em&gt;Tav&lt;/em&gt;, &quot;Seal/Mark&quot;. Gematria: &lt;strong&gt;400&lt;/strong&gt;. CUSIP identifier.">ת</span></td>\n          <td>Tav — seal, mark</td>'),

    ('<td><span class="td-heb">דתכ</span></td>\n          <td>Mashiach ben David</td>',
     '<td><span class="td-heb tooltip-trigger" data-tooltip-title="Hebrew Initials" data-tooltip="דתכ — DTC in Hebrew. Gematria &lt;strong&gt;424&lt;/strong&gt; = &lt;em&gt;Mashiach ben David&lt;/em&gt;.">דתכ</span></td>\n          <td>Mashiach ben David</td>'),

    ('<td><span class="td-heb">דתככ</span></td>\n          <td>4 × 111 (divine unity)</td>',
     '<td><span class="td-heb tooltip-trigger" data-tooltip-title="Hebrew Initials" data-tooltip="דתככ — DTCC in Hebrew. Gematria &lt;strong&gt;444&lt;/strong&gt; = 4 × 111.">דתככ</span></td>\n          <td>4 × 111 (divine unity)</td>'),

    ('<td><span class="td-heb">ק</span></td>\n          <td>Jubilee threshold (50 × 10)</td>',
     '<td><span class="td-heb tooltip-trigger" data-tooltip-title="Hebrew Letter" data-tooltip="ק — &lt;em&gt;Qof&lt;/em&gt;, &quot;back of the head/cycle.&quot; Gematria: &lt;strong&gt;100&lt;/strong&gt;. Jubilee (50) × Decalogue (10) = 500.">ק</span></td>\n          <td>Jubilee threshold (50 × 10)</td>'),

    ('<td><span class="td-heb">יב״ד</span></td>\n          <td>Covenant square (12²)</td>',
     '<td><span class="td-heb tooltip-trigger" data-tooltip-title="Numerological Concept" data-tooltip="יב״ד — 12 in Hebrew numerals. 12² = &lt;strong&gt;144&lt;/strong&gt;, the covenant square.">יב״ד</span></td>\n          <td>Covenant square (12²)</td>'),

    ('<td><span class="td-heb">אמת</span></td>\n          <td>Emet — Truth (21²)</td>',
     '<td><span class="td-heb tooltip-trigger" data-tooltip-title="Hebrew Word" data-tooltip="אמת — &lt;em&gt;Emet&lt;/em&gt;, Truth. Gematria &lt;strong&gt;441&lt;/strong&gt; = 21². Seal of God.">אמת</span></td>\n          <td>Emet — Truth (21²)</td>'),

    ('<td><span class="td-heb">חברת נאמנות הפיקדון</span></td>',
     '<td><span class="td-heb tooltip-trigger" data-tooltip-title="Hebrew Name" data-tooltip="חברת נאמנות הפיקדון — DTC full Hebrew name. Gematria &lt;strong&gt;1412&lt;/strong&gt; = 4 × 353.">חברת נאמנות הפיקדון</span></td>'),

    ('<td><span class="td-heb">תאגיד סליקת נאמנויות</span></td>',
     '<td><span class="td-heb tooltip-trigger" data-tooltip-title="Hebrew Name" data-tooltip="תאגיד סליקת נאמנויות — DTCC full Hebrew name. Gematria &lt;strong&gt;1775&lt;/strong&gt; = 25 × 71.">תאגיד סליקת נאמנויות</span></td>'),

    ('<td><span class="td-heb">לוותר ושות</span></td>',
     '<td><span class="td-heb tooltip-trigger" data-tooltip-title="Hebrew Name" data-tooltip="לוותר ושות — Cede &amp; Co. Hebrew rendering (&quot;to yield and partners&quot;). Gematria &lt;strong&gt;1354&lt;/strong&gt;.">לוותר ושות</span></td>'),
]

missing = []
applied = 0
for old, new in pairs:
    if old not in html:
        missing.append(old[:100])
    else:
        html = html.replace(old, new, 1)
        applied += 1

path.write_text(html)

before = 58  # known count
after = html.count('tooltip-trigger')
print(f'Applied {applied}/{len(pairs)} replacements')
print(f'Tooltip triggers: ~{before} -> {after} (+{after - before})')
if missing:
    print('Missing patterns:')
    for m in missing:
        print(' -', m)
