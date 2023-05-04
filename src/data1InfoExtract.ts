import * as cheerio from 'cheerio';

const sample =
`<table border="0" cellpadding="3" callspacing="3" width="100%">
    <tbody>
        <tr bgcolor="#eeeeee" align="center">
            <td><span style="font-size: 11pt;">1</span></td>
            <td><span style="font-size: 11pt;">창세기</span></td>
            <td><span style="font-size: 11pt;">창</span></td>
            <td><span style="font-size: 11pt;">Genesis</span></td>
            <td><span style="font-size: 11pt;">Gen</span></td>
            <td><span style="font-size: 11pt;">50</span></td>
            <td><span style="font-size: 11pt;">1,533</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">2</span></td>
                <td><span style="font-size: 11pt;">출애굽기</span></td>
                <td><span style="font-size: 11pt;">출</span></td>
                <td><span style="font-size: 11pt;">Exodus</span></td>
                <td><span style="font-size: 11pt;">Exod</span></td>
                <td><span style="font-size: 11pt;">40</span></td>
                <td><span style="font-size: 11pt;">1,213</span></td>
        </tr>
    </tbody>
</table>
`
const htmlString = `<table border="0" cellpadding="3" callspacing="3" width="100%">
<tbody>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">1</span></td>
                <td><span style="font-size: 11pt;">창세기</span></td>
                <td><span style="font-size: 11pt;">창</span></td>
                <td><span style="font-size: 11pt;">Genesis</span></td>
                <td><span style="font-size: 11pt;">Gen</span></td>
                <td><span style="font-size: 11pt;">50</span></td>
                <td><span style="font-size: 11pt;">1,533</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">2</span></td>
                <td><span style="font-size: 11pt;">출애굽기</span></td>
                <td><span style="font-size: 11pt;">출</span></td>
                <td><span style="font-size: 11pt;">Exodus</span></td>
                <td><span style="font-size: 11pt;">Exod</span></td>
                <td><span style="font-size: 11pt;">40</span></td>
                <td><span style="font-size: 11pt;">1,213</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">3</span></td>
                <td><span style="font-size: 11pt;">레위기</span></td>
                <td><span style="font-size: 11pt;">레</span></td>
                <td><span style="font-size: 11pt;">Leviticus</span></td>
                <td><span style="font-size: 11pt;">Lev</span></td>
                <td><span style="font-size: 11pt;">27</span></td>
                <td><span style="font-size: 11pt;">859</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">4</span></td>
                <td><span style="font-size: 11pt;">민수기</span></td>
                <td><span style="font-size: 11pt;">민</span></td>
                <td><span style="font-size: 11pt;">Numbers</span></td>
                <td><span style="font-size: 11pt;">Num</span></td>
                <td><span style="font-size: 11pt;">36</span></td>
                <td><span style="font-size: 11pt;">1,288</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">5</span></td>
                <td><span style="font-size: 11pt;">신명기</span></td>
                <td><span style="font-size: 11pt;">신</span></td>
                <td><span style="font-size: 11pt;">Deuteronomy</span></td>
                <td><span style="font-size: 11pt;">Deut</span></td>
                <td><span style="font-size: 11pt;">34</span></td>
                <td><span style="font-size: 11pt;">959</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">6</span></td>
                <td><span style="font-size: 11pt;">여호수아</span></td>
                <td><span style="font-size: 11pt;">수</span></td>
                <td><span style="font-size: 11pt;">Joshua</span></td>
                <td><span style="font-size: 11pt;">Josh</span></td>
                <td><span style="font-size: 11pt;">24</span></td>
                <td><span style="font-size: 11pt;">658</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">7</span></td>
                <td><span style="font-size: 11pt;">사사기</span></td>
                <td><span style="font-size: 11pt;">삿</span></td>
                <td><span style="font-size: 11pt;">Judges</span></td>
                <td><span style="font-size: 11pt;">Judg</span></td>
                <td><span style="font-size: 11pt;">21</span></td>
                <td><span style="font-size: 11pt;">618</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">8</span></td>
                <td><span style="font-size: 11pt;">룻기</span></td>
                <td><span style="font-size: 11pt;">룻</span></td>
                <td><span style="font-size: 11pt;">Ruth</span></td>
                <td><span style="font-size: 11pt;">Ruth</span></td>
                <td><span style="font-size: 11pt;">4</span></td>
                <td><span style="font-size: 11pt;">85</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">9</span></td>
                <td><span style="font-size: 11pt;">사무엘상</span></td>
                <td><span style="font-size: 11pt;">삼상</span></td>
                <td><span style="font-size: 11pt;">1 Samuel</span></td>
                <td><span style="font-size: 11pt;">1Sam</span></td>
                <td><span style="font-size: 11pt;">31</span></td>
                <td><span style="font-size: 11pt;">810</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">10</span></td>
                <td><span style="font-size: 11pt;">사무엘하</span></td>
                <td><span style="font-size: 11pt;">삼하</span></td>
                <td><span style="font-size: 11pt;">2 Samuel</span></td>
                <td><span style="font-size: 11pt;">2Sam</span></td>
                <td><span style="font-size: 11pt;">24</span></td>
                <td><span style="font-size: 11pt;">695</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">11</span></td>
                <td><span style="font-size: 11pt;">열왕기상</span></td>
                <td><span style="font-size: 11pt;">왕상</span></td>
                <td><span style="font-size: 11pt;">1 Kings</span></td>
                <td><span style="font-size: 11pt;">1Kgs</span></td>
                <td><span style="font-size: 11pt;">22</span></td>
                <td><span style="font-size: 11pt;">816</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">12</span></td>
                <td><span style="font-size: 11pt;">열왕기하</span></td>
                <td><span style="font-size: 11pt;">왕하</span></td>
                <td><span style="font-size: 11pt;">2 Kings</span></td>
                <td><span style="font-size: 11pt;">2Kgs</span></td>
                <td><span style="font-size: 11pt;">25</span></td>
                <td><span style="font-size: 11pt;">719</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">13</span></td>
                <td><span style="font-size: 11pt;">역대상</span></td>
                <td><span style="font-size: 11pt;">대상</span></td>
                <td><span style="font-size: 11pt;">1 Chronicles</span></td>
                <td><span style="font-size: 11pt;">1Chr</span></td>
                <td><span style="font-size: 11pt;">29</span></td>
                <td><span style="font-size: 11pt;">942</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">14</span></td>
                <td><span style="font-size: 11pt;">역대하</span></td>
                <td><span style="font-size: 11pt;">대하</span></td>
                <td><span style="font-size: 11pt;">2 Chronicles</span></td>
                <td><span style="font-size: 11pt;">2Chr</span></td>
                <td><span style="font-size: 11pt;">36</span></td>
                <td><span style="font-size: 11pt;">822</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">15</span></td>
                <td><span style="font-size: 11pt;">에스라</span></td>
                <td><span style="font-size: 11pt;">스</span></td>
                <td><span style="font-size: 11pt;">Ezra</span></td>
                <td><span style="font-size: 11pt;">Ezra</span></td>
                <td><span style="font-size: 11pt;">10</span></td>
                <td><span style="font-size: 11pt;">280</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">16</span></td>
                <td><span style="font-size: 11pt;">느헤미야</span></td>
                <td><span style="font-size: 11pt;">느</span></td>
                <td><span style="font-size: 11pt;">Nehemiah</span></td>
                <td><span style="font-size: 11pt;">Neh</span></td>
                <td><span style="font-size: 11pt;">13</span></td>
                <td><span style="font-size: 11pt;">406</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">17</span></td>
                <td><span style="font-size: 11pt;">에스더</span></td>
                <td><span style="font-size: 11pt;">에</span></td>
                <td><span style="font-size: 11pt;">Esther</span></td>
                <td><span style="font-size: 11pt;">Esth</span></td>
                <td><span style="font-size: 11pt;">10</span></td>
                <td><span style="font-size: 11pt;">167</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">18</span></td>
                <td><span style="font-size: 11pt;">욥기</span></td>
                <td><span style="font-size: 11pt;">욥</span></td>
                <td><span style="font-size: 11pt;">Job</span></td>
                <td><span style="font-size: 11pt;">Job</span></td>
                <td><span style="font-size: 11pt;">42</span></td>
                <td><span style="font-size: 11pt;">1,070</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">19</span></td>
                <td><span style="font-size: 11pt;">시편</span></td>
                <td><span style="font-size: 11pt;">시</span></td>
                <td><span style="font-size: 11pt;">Psalm</span></td>
                <td><span style="font-size: 11pt;">Ps</span></td>
                <td><span style="font-size: 11pt;">150</span></td>
                <td><span style="font-size: 11pt;">2,461</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">20</span></td>
                <td><span style="font-size: 11pt;">잠언</span></td>
                <td><span style="font-size: 11pt;">잠</span></td>
                <td><span style="font-size: 11pt;">Proverbs</span></td>
                <td><span style="font-size: 11pt;">Prov</span></td>
                <td><span style="font-size: 11pt;">31</span></td>
                <td><span style="font-size: 11pt;">915</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">21</span></td>
                <td><span style="font-size: 11pt;">전도서</span></td>
                <td><span style="font-size: 11pt;">전</span></td>
                <td><span style="font-size: 11pt;">Ecclesiastes</span></td>
                <td><span style="font-size: 11pt;">Eccl</span></td>
                <td><span style="font-size: 11pt;">12</span></td>
                <td><span style="font-size: 11pt;">222</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">22</span></td>
                <td><span style="font-size: 11pt;">아가</span></td>
                <td><span style="font-size: 11pt;">아</span></td>
                <td><span style="font-size: 11pt;">Song of Solomon</span></td>
                <td><span style="font-size: 11pt;">Song</span></td>
                <td><span style="font-size: 11pt;">8</span></td>
                <td><span style="font-size: 11pt;">117</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">23</span></td>
                <td><span style="font-size: 11pt;">이사야</span></td>
                <td><span style="font-size: 11pt;">사</span></td>
                <td><span style="font-size: 11pt;">Isaiah</span></td>
                <td><span style="font-size: 11pt;">Isa</span></td>
                <td><span style="font-size: 11pt;">66</span></td>
                <td><span style="font-size: 11pt;">1,292</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">24</span></td>
                <td><span style="font-size: 11pt;">예레미야</span></td>
                <td><span style="font-size: 11pt;">렘</span></td>
                <td><span style="font-size: 11pt;">Jeremiah</span></td>
                <td><span style="font-size: 11pt;">Jer</span></td>
                <td><span style="font-size: 11pt;">52</span></td>
                <td><span style="font-size: 11pt;">1,364</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">25</span></td>
                <td><span style="font-size: 11pt;">예레미야애가</span></td>
                <td><span style="font-size: 11pt;">애</span></td>
                <td><span style="font-size: 11pt;">Lamentations</span></td>
                <td><span style="font-size: 11pt;">Lam</span></td>
                <td><span style="font-size: 11pt;">5</span></td>
                <td><span style="font-size: 11pt;">154</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">26</span></td>
                <td><span style="font-size: 11pt;">에스겔</span></td>
                <td><span style="font-size: 11pt;">겔</span></td>
                <td><span style="font-size: 11pt;">Ezekiel</span></td>
                <td><span style="font-size: 11pt;">Ezek</span></td>
                <td><span style="font-size: 11pt;">48</span></td>
                <td><span style="font-size: 11pt;">1,273</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">27</span></td>
                <td><span style="font-size: 11pt;">다니엘</span></td>
                <td><span style="font-size: 11pt;">단</span></td>
                <td><span style="font-size: 11pt;">Daniel</span></td>
                <td><span style="font-size: 11pt;">Dan</span></td>
                <td><span style="font-size: 11pt;">12</span></td>
                <td><span style="font-size: 11pt;">357</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">28</span></td>
                <td><span style="font-size: 11pt;">호세아</span></td>
                <td><span style="font-size: 11pt;">호</span></td>
                <td><span style="font-size: 11pt;">Hosea</span></td>
                <td><span style="font-size: 11pt;">Hos</span></td>
                <td><span style="font-size: 11pt;">14</span></td>
                <td><span style="font-size: 11pt;">197</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">29</span></td>
                <td><span style="font-size: 11pt;">요엘</span></td>
                <td><span style="font-size: 11pt;">욜</span></td>
                <td><span style="font-size: 11pt;">Joel</span></td>
                <td><span style="font-size: 11pt;">Joel</span></td>
                <td><span style="font-size: 11pt;">3</span></td>
                <td><span style="font-size: 11pt;">73</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">30</span></td>
                <td><span style="font-size: 11pt;">아모스</span></td>
                <td><span style="font-size: 11pt;">암</span></td>
                <td><span style="font-size: 11pt;">Amos</span></td>
                <td><span style="font-size: 11pt;">Amos</span></td>
                <td><span style="font-size: 11pt;">9</span></td>
                <td><span style="font-size: 11pt;">146</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">31</span></td>
                <td><span style="font-size: 11pt;">오바댜</span></td>
                <td><span style="font-size: 11pt;">옵</span></td>
                <td><span style="font-size: 11pt;">Obadiah</span></td>
                <td><span style="font-size: 11pt;">Obad</span></td>
                <td><span style="font-size: 11pt;">1</span></td>
                <td><span style="font-size: 11pt;">21</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">32</span></td>
                <td><span style="font-size: 11pt;">요나</span></td>
                <td><span style="font-size: 11pt;">욘</span></td>
                <td><span style="font-size: 11pt;">Jonah</span></td>
                <td><span style="font-size: 11pt;">Jonah</span></td>
                <td><span style="font-size: 11pt;">4</span></td>
                <td><span style="font-size: 11pt;">48</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">33</span></td>
                <td><span style="font-size: 11pt;">미가</span></td>
                <td><span style="font-size: 11pt;">미</span></td>
                <td><span style="font-size: 11pt;">Micah</span></td>
                <td><span style="font-size: 11pt;">Mic</span></td>
                <td><span style="font-size: 11pt;">7</span></td>
                <td><span style="font-size: 11pt;">105</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">34</span></td>
                <td><span style="font-size: 11pt;">나훔</span></td>
                <td><span style="font-size: 11pt;">나</span></td>
                <td><span style="font-size: 11pt;">Nahum</span></td>
                <td><span style="font-size: 11pt;">Nah</span></td>
                <td><span style="font-size: 11pt;">3</span></td>
                <td><span style="font-size: 11pt;">47</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">35</span></td>
                <td><span style="font-size: 11pt;">하박국</span></td>
                <td><span style="font-size: 11pt;">합</span></td>
                <td><span style="font-size: 11pt;">Habakkuk</span></td>
                <td><span style="font-size: 11pt;">Hab</span></td>
                <td><span style="font-size: 11pt;">3</span></td>
                <td><span style="font-size: 11pt;">56</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">36</span></td>
                <td><span style="font-size: 11pt;">스바냐</span></td>
                <td><span style="font-size: 11pt;">습</span></td>
                <td><span style="font-size: 11pt;">Zephaniah</span></td>
                <td><span style="font-size: 11pt;">Zeph</span></td>
                <td><span style="font-size: 11pt;">3</span></td>
                <td><span style="font-size: 11pt;">53</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">37</span></td>
                <td><span style="font-size: 11pt;">학개</span></td>
                <td><span style="font-size: 11pt;">학</span></td>
                <td><span style="font-size: 11pt;">Haggai</span></td>
                <td><span style="font-size: 11pt;">Hag</span></td>
                <td><span style="font-size: 11pt;">2</span></td>
                <td><span style="font-size: 11pt;">38</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">38</span></td>
                <td><span style="font-size: 11pt;">스가랴</span></td>
                <td><span style="font-size: 11pt;">슥</span></td>
                <td><span style="font-size: 11pt;">Zechariah</span></td>
                <td><span style="font-size: 11pt;">Zech</span></td>
                <td><span style="font-size: 11pt;">14</span></td>
                <td><span style="font-size: 11pt;">211</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">39</span></td>
                <td><span style="font-size: 11pt;">말라기</span></td>
                <td><span style="font-size: 11pt;">말</span></td>
                <td><span style="font-size: 11pt;">Malachi</span></td>
                <td><span style="font-size: 11pt;">Mal</span></td>
                <td><span style="font-size: 11pt;">4</span></td>
                <td><span style="font-size: 11pt;">55</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">40</span></td>
                <td><span style="font-size: 11pt;">마태복음</span></td>
                <td><span style="font-size: 11pt;">마</span></td>
                <td><span style="font-size: 11pt;">Matthew</span></td>
                <td><span style="font-size: 11pt;">Matt</span></td>
                <td><span style="font-size: 11pt;">28</span></td>
                <td><span style="font-size: 11pt;">1,071</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">41</span></td>
                <td><span style="font-size: 11pt;">마가복음</span></td>
                <td><span style="font-size: 11pt;">막</span></td>
                <td><span style="font-size: 11pt;">Mark</span></td>
                <td><span style="font-size: 11pt;">Mark</span></td>
                <td><span style="font-size: 11pt;">16</span></td>
                <td><span style="font-size: 11pt;">678</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">42</span></td>
                <td><span style="font-size: 11pt;">누가복음</span></td>
                <td><span style="font-size: 11pt;">눅</span></td>
                <td><span style="font-size: 11pt;">Luke</span></td>
                <td><span style="font-size: 11pt;">Luke</span></td>
                <td><span style="font-size: 11pt;">24</span></td>
                <td><span style="font-size: 11pt;">1,151</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">43</span></td>
                <td><span style="font-size: 11pt;">요한복음</span></td>
                <td><span style="font-size: 11pt;">요</span></td>
                <td><span style="font-size: 11pt;">John</span></td>
                <td><span style="font-size: 11pt;">John</span></td>
                <td><span style="font-size: 11pt;">21</span></td>
                <td><span style="font-size: 11pt;">879</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">44</span></td>
                <td><span style="font-size: 11pt;">사도행전</span></td>
                <td><span style="font-size: 11pt;">행</span></td>
                <td><span style="font-size: 11pt;">Acts</span></td>
                <td><span style="font-size: 11pt;">Acts</span></td>
                <td><span style="font-size: 11pt;">28</span></td>
                <td><span style="font-size: 11pt;">1,007</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">45</span></td>
                <td><span style="font-size: 11pt;">로마서</span></td>
                <td><span style="font-size: 11pt;">롬</span></td>
                <td><span style="font-size: 11pt;">Romans</span></td>
                <td><span style="font-size: 11pt;">Rom</span></td>
                <td><span style="font-size: 11pt;">16</span></td>
                <td><span style="font-size: 11pt;">433</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">46</span></td>
                <td><span style="font-size: 11pt;">고린도전서</span></td>
                <td><span style="font-size: 11pt;">고전</span></td>
                <td><span style="font-size: 11pt;">1 Corinthians</span></td>
                <td><span style="font-size: 11pt;">1Cor</span></td>
                <td><span style="font-size: 11pt;">16</span></td>
                <td><span style="font-size: 11pt;">437</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">47</span></td>
                <td><span style="font-size: 11pt;">고린도후서</span></td>
                <td><span style="font-size: 11pt;">고후</span></td>
                <td><span style="font-size: 11pt;">2 Corinthians</span></td>
                <td><span style="font-size: 11pt;">2Cor</span></td>
                <td><span style="font-size: 11pt;">13</span></td>
                <td><span style="font-size: 11pt;">257</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">48</span></td>
                <td><span style="font-size: 11pt;">갈라디아서</span></td>
                <td><span style="font-size: 11pt;">갈</span></td>
                <td><span style="font-size: 11pt;">Galatians</span></td>
                <td><span style="font-size: 11pt;">Gal</span></td>
                <td><span style="font-size: 11pt;">6</span></td>
                <td><span style="font-size: 11pt;">149</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">49</span></td>
                <td><span style="font-size: 11pt;">에베소서</span></td>
                <td><span style="font-size: 11pt;">엡</span></td>
                <td><span style="font-size: 11pt;">Ephesians</span></td>
                <td><span style="font-size: 11pt;">Eph</span></td>
                <td><span style="font-size: 11pt;">6</span></td>
                <td><span style="font-size: 11pt;">155</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">50</span></td>
                <td><span style="font-size: 11pt;">빌립보서</span></td>
                <td><span style="font-size: 11pt;">빌</span></td>
                <td><span style="font-size: 11pt;">Philippians</span></td>
                <td><span style="font-size: 11pt;">Phil</span></td>
                <td><span style="font-size: 11pt;">4</span></td>
                <td><span style="font-size: 11pt;">104</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">51</span></td>
                <td><span style="font-size: 11pt;">골로새서</span></td>
                <td><span style="font-size: 11pt;">골</span></td>
                <td><span style="font-size: 11pt;">Colossians</span></td>
                <td><span style="font-size: 11pt;">Col</span></td>
                <td><span style="font-size: 11pt;">4</span></td>
                <td><span style="font-size: 11pt;">95</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">52</span></td>
                <td><span style="font-size: 11pt;">데살로니가전서</span></td>
                <td><span style="font-size: 11pt;">살전</span></td>
                <td><span style="font-size: 11pt;">1 Thessalonians</span></td>
                <td><span style="font-size: 11pt;">1Thess</span></td>
                <td><span style="font-size: 11pt;">5</span></td>
                <td><span style="font-size: 11pt;">89</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">53</span></td>
                <td><span style="font-size: 11pt;">데살로니가후서</span></td>
                <td><span style="font-size: 11pt;">살후</span></td>
                <td><span style="font-size: 11pt;">2 Thessalonians</span></td>
                <td><span style="font-size: 11pt;">2Thess</span></td>
                <td><span style="font-size: 11pt;">3</span></td>
                <td><span style="font-size: 11pt;">47</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">54</span></td>
                <td><span style="font-size: 11pt;">디모데전서</span></td>
                <td><span style="font-size: 11pt;">딤전</span></td>
                <td><span style="font-size: 11pt;">1 Timothy</span></td>
                <td><span style="font-size: 11pt;">1Tim</span></td>
                <td><span style="font-size: 11pt;">6</span></td>
                <td><span style="font-size: 11pt;">113</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">55</span></td>
                <td><span style="font-size: 11pt;">디모데후서</span></td>
                <td><span style="font-size: 11pt;">딤후</span></td>
                <td><span style="font-size: 11pt;">2 Timothy</span></td>
                <td><span style="font-size: 11pt;">2Tim</span></td>
                <td><span style="font-size: 11pt;">4</span></td>
                <td><span style="font-size: 11pt;">83</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">56</span></td>
                <td><span style="font-size: 11pt;">디도서</span></td>
                <td><span style="font-size: 11pt;">딛</span></td>
                <td><span style="font-size: 11pt;">Titus</span></td>
                <td><span style="font-size: 11pt;">Titus</span></td>
                <td><span style="font-size: 11pt;">3</span></td>
                <td><span style="font-size: 11pt;">46</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">57</span></td>
                <td><span style="font-size: 11pt;">빌레몬서</span></td>
                <td><span style="font-size: 11pt;">몬</span></td>
                <td><span style="font-size: 11pt;">Philemon</span></td>
                <td><span style="font-size: 11pt;">Phlm</span></td>
                <td><span style="font-size: 11pt;">1</span></td>
                <td><span style="font-size: 11pt;">25</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">58</span></td>
                <td><span style="font-size: 11pt;">히브리서</span></td>
                <td><span style="font-size: 11pt;">히</span></td>
                <td><span style="font-size: 11pt;">Hebrews</span></td>
                <td><span style="font-size: 11pt;">Heb</span></td>
                <td><span style="font-size: 11pt;">13</span></td>
                <td><span style="font-size: 11pt;">303</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">59</span></td>
                <td><span style="font-size: 11pt;">야고보서</span></td>
                <td><span style="font-size: 11pt;">약</span></td>
                <td><span style="font-size: 11pt;">James</span></td>
                <td><span style="font-size: 11pt;">Jas</span></td>
                <td><span style="font-size: 11pt;">5</span></td>
                <td><span style="font-size: 11pt;">108</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">60</span></td>
                <td><span style="font-size: 11pt;">베드로전서</span></td>
                <td><span style="font-size: 11pt;">벧전</span></td>
                <td><span style="font-size: 11pt;">1 Peter</span></td>
                <td><span style="font-size: 11pt;">1Pet</span></td>
                <td><span style="font-size: 11pt;">5</span></td>
                <td><span style="font-size: 11pt;">105</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">61</span></td>
                <td><span style="font-size: 11pt;">베드로후서</span></td>
                <td><span style="font-size: 11pt;">벧후</span></td>
                <td><span style="font-size: 11pt;">2 Peter</span></td>
                <td><span style="font-size: 11pt;">2Pet</span></td>
                <td><span style="font-size: 11pt;">3</span></td>
                <td><span style="font-size: 11pt;">61</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">62</span></td>
                <td><span style="font-size: 11pt;">요한일서</span></td>
                <td><span style="font-size: 11pt;">요일</span></td>
                <td><span style="font-size: 11pt;">1 John</span></td>
                <td><span style="font-size: 11pt;">1John</span></td>
                <td><span style="font-size: 11pt;">5</span></td>
                <td><span style="font-size: 11pt;">105</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">63</span></td>
                <td><span style="font-size: 11pt;">요한이서</span></td>
                <td><span style="font-size: 11pt;">요이</span></td>
                <td><span style="font-size: 11pt;">2 John</span></td>
                <td><span style="font-size: 11pt;">2John</span></td>
                <td><span style="font-size: 11pt;">1</span></td>
                <td><span style="font-size: 11pt;">13</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">64</span></td>
                <td><span style="font-size: 11pt;">요한삼서</span></td>
                <td><span style="font-size: 11pt;">요삼</span></td>
                <td><span style="font-size: 11pt;">3 John</span></td>
                <td><span style="font-size: 11pt;">3John</span></td>
                <td><span style="font-size: 11pt;">1</span></td>
                <td><span style="font-size: 11pt;">14</span></td>
        </tr>
        <tr bgcolor="#eeeeee" align="center">
                <td><span style="font-size: 11pt;">65</span></td>
                <td><span style="font-size: 11pt;">유다서</span></td>
                <td><span style="font-size: 11pt;">유</span></td>
                <td><span style="font-size: 11pt;">Jude</span></td>
                <td><span style="font-size: 11pt;">Jude</span></td>
                <td><span style="font-size: 11pt;">1</span></td>
                <td><span style="font-size: 11pt;">25</span></td>
        </tr>
        <tr bgcolor="#ffffff" align="center">
                <td><span style="font-size: 11pt;">66</span></td>
                <td><span style="font-size: 11pt;">요한계시록</span></td>
                <td><span style="font-size: 11pt;">계</span></td>
                <td><span style="font-size: 11pt;">Revelation</span></td>
                <td><span style="font-size: 11pt;">Rev</span></td>
                <td><span style="font-size: 11pt;">22</span></td>
                <td><span style="font-size: 11pt;">404</span></td>
        </tr>
        <tr bgcolor="yellow" align="center">
                <th><span style="font-weight: normal; font-size: 11pt;">합계</span></th>
                <th colspan="4"><span style="font-weight: normal; font-size: 11pt;">&nbsp;</span></th>
                <th><span style="font-weight: normal; font-size: 11pt;">1,189</span></th>
                <th><span style="font-weight: normal; font-size: 11pt;">31,102</span></th>
        </tr>
</tbody>
</table>
`

const $ = cheerio.load(htmlString);
const trs = $('tr');

const result = trs.map((_, tr) => {
  const tds = $(tr).find('td');
  const values = tds.map((_, td) => $(td).find('span').text()).get();
  return values;
}).get();

const chunkSize = 7; // 각 배열의 길이 (td의 개수)
const modifiedResult: any[] = [];

// 번호	한글 성경 이름	한글 약자	영문 성경 이름	영문 약자	장수	절수
const newInfo = (arr: any[]) => ({
    fullNameKr: arr[1].trim(),
    shortNameKr: arr[2].trim(),
    fullNameEn: arr[3].trim(),
    shortNameEn: arr[4].trim(),
    numOfChapter: arr[5].trim(),
    numOfVerse: arr[6].trim().replaceAll(',', '')
})
for (let i = 0; i < result.length; i += chunkSize) {
  modifiedResult.push(newInfo(result.slice(i, i + chunkSize)));
}

// ['1', '2'].find(el => el)

console.log(modifiedResult);