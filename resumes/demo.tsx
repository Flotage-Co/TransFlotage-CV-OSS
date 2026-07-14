import {
  ResumeBullet,
  ResumeBullets,
  ResumeDocument,
  ResumeEntry,
  ResumeGrid,
  ResumeGridRow,
  ResumeHeader,
  ResumeInline,
  ResumeNote,
  ResumeSection,
} from "@/components/Resume";
import type { StudentResume } from "./types";

function DemoEnglish() {
  return (
    <ResumeDocument lang="en">
      <ResumeHeader
        name="Lin Zhiyuan"
        summary="Backend and machine-learning engineer with internships at Tencent and ByteDance, building high-concurrency systems and recommendation models. I like owning a problem end to end — from distributed-systems design to shipping measurable gains in production — and am now seeking an MSc to deepen my research in distributed systems and applied ML."
        contacts={[
          { label: "linzhiyuan@example.com", href: "mailto:linzhiyuan@example.com", icon: "email" },
          { label: "+86 138 0000 0000", icon: "phone" },
          { label: "github.com/example", href: "https://github.com/example", icon: "github" },
          { label: "in/example", href: "https://linkedin.com/in/example", icon: "linkedin" },
          { label: "example.com", href: "https://example.com", icon: "link" },
        ]}
      />

      <ResumeSection title="Education">
        <ResumeEntry
          title="Sun Yat-sen University"
          location="Guangzhou"
          role="B.Eng., Computer Science & Technology"
          date="Sep 2022 – Jun 2026"
        >
          <ResumeNote>GPA 3.8 / 4.0, Top 5% of major</ResumeNote>
          <ResumeNote plain>Relevant Coursework: Data Structures & Algorithms, Machine Learning, Operating Systems, Database Systems, Computer Networks</ResumeNote>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="Professional Experience">
        <ResumeEntry
          title="Tencent"
          location="Shenzhen"
          role="Backend Engineer Intern"
          date="Jun 2025 – Sep 2025"
        >
          <ResumeBullets>
            <ResumeBullet>Rearchitected the WeChat Pay reconciliation pipeline, cutting the daily batch runtime from 4 hours to 45 minutes.</ResumeBullet>
            <ResumeBullet>Built a high-concurrency reconciliation service in Go, handling ~20M transactions per day.</ResumeBullet>
            <ResumeBullet>Raised core-module test coverage from 62% to 91% with unit and integration tests.</ResumeBullet>
          </ResumeBullets>
        </ResumeEntry>
        <ResumeEntry
          title="ByteDance"
          location="Beijing"
          role="Algorithm Research Intern"
          date="Jul 2024 – Oct 2024"
        >
          <ResumeBullets>
            <ResumeBullet>Optimized recall models on the recommendation team, improving offline AUC by 1.8%.</ResumeBullet>
            <ResumeBullet>Reproduced and improved a two-tower recall model in PyTorch, lifting CTR by 3.2% after launch.</ResumeBullet>
          </ResumeBullets>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="Selected Projects">
        <ResumeEntry
          title="Distributed KV Store"
          href="https://github.com/example/kvstore"
          location="Go, Raft, LSM-Tree, gRPC"
          role="Project Lead"
          date="Mar 2024 – Dec 2024"
        >
          <ResumeBullets>
            <ResumeBullet>Implemented a strongly-consistent distributed key-value store on the Raft consensus algorithm with dynamic membership.</ResumeBullet>
            <ResumeBullet>Built an LSM-Tree storage engine reaching 120K write ops/s.</ResumeBullet>
          </ResumeBullets>
        </ResumeEntry>
        <ResumeEntry
          title="Chinese Medical QA"
          location="Python, RAG, LLM, FAISS"
          role="Core Developer"
          date="Sep 2023 – Jan 2024"
        >
          <ResumeBullets>
            <ResumeBullet>Built a retrieval-augmented medical Q&A system over 300K structured knowledge entries.</ResumeBullet>
            <ResumeBullet>Improved answer accuracy from 71% to 86% on an in-house test set.</ResumeBullet>
          </ResumeBullets>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="Awards & Honors">
        <ResumeEntry
          title="Silver Medal, ICPC Asia Regional Contest"
          role="ICPC"
          date="Nov 2024"
        />
        <ResumeEntry title="National Scholarship" role="Ministry of Education" date="Oct 2023">
          <ResumeNote plain>Awarded to the top 1% of students by overall ranking.</ResumeNote>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="Technical Profile">
        <ResumeGrid>
          <ResumeGridRow label="Languages">Go, Python, C++, TypeScript, SQL</ResumeGridRow>
          <ResumeGridRow label="Frameworks & Tools">PyTorch, gRPC, Docker, Kubernetes, Redis</ResumeGridRow>
          <ResumeGridRow label="Research Areas">Distributed Systems, Machine Learning, Recommender Systems</ResumeGridRow>
        </ResumeGrid>
      </ResumeSection>

      <ResumeSection title="Languages">
        <ResumeInline label="English" lang="en">IELTS 7.5 (Listening 8.0)</ResumeInline>
        <ResumeInline label="Mandarin" lang="en">Native</ResumeInline>
      </ResumeSection>
    </ResumeDocument>
  );
}

function DemoChinese() {
  return (
    <ResumeDocument lang="zh">
      <ResumeHeader
        name="林知远"
        summary="后端与机器学习方向工程师，先后在腾讯、字节跳动实习，擅长高并发系统设计与推荐模型优化，习惯从架构设计到线上指标端到端负责一件事。希望通过计算机科学硕士，进一步深入分布式系统与应用机器学习方向的研究。"
        contacts={[
          { label: "linzhiyuan@example.com", href: "mailto:linzhiyuan@example.com", icon: "email" },
          { label: "+86 138 0000 0000", icon: "phone" },
          { label: "GitHub", href: "https://github.com/example", icon: "github" },
          { label: "LinkedIn", href: "https://linkedin.com/in/example", icon: "linkedin" },
          { label: "个人网站", href: "https://example.com", icon: "link" },
        ]}
      />

      <ResumeSection title="教育背景">
        <ResumeEntry
          title="中山大学"
          titleSuffix="Sun Yat-sen University"
          location="广州"
          role="工学学士，计算机科学与技术"
          date="2022.09 – 2026.06"
        >
          <ResumeNote>GPA 3.8 / 4.0，专业前 5%</ResumeNote>
          <ResumeNote>主修课程：数据结构与算法、机器学习、操作系统、数据库系统、计算机网络</ResumeNote>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="实习经历">
        <ResumeEntry
          title="腾讯"
          titleSuffix="Tencent"
          location="深圳"
          role="后端开发实习生"
          date="2025.06 – 2025.09"
        >
          <ResumeBullets>
            <ResumeBullet>参与微信支付对账系统重构，将每日批处理耗时从 4 小时降低到 45 分钟。</ResumeBullet>
            <ResumeBullet>用 Go 实现高并发对账服务，支撑日均 2000 万笔交易的核对。</ResumeBullet>
            <ResumeBullet>编写单元与集成测试，将核心模块测试覆盖率从 62% 提升到 91%。</ResumeBullet>
          </ResumeBullets>
        </ResumeEntry>
        <ResumeEntry
          title="字节跳动"
          titleSuffix="ByteDance"
          location="北京"
          role="算法研究实习生"
          date="2024.07 – 2024.10"
        >
          <ResumeBullets>
            <ResumeBullet>在推荐系统组负责召回模型优化，离线 AUC 提升 1.8%。</ResumeBullet>
            <ResumeBullet>基于 PyTorch 复现并改进双塔召回模型，上线后点击率提升 3.2%。</ResumeBullet>
          </ResumeBullets>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="代表项目">
        <ResumeEntry
          title="分布式键值存储引擎"
          titleSuffix="Distributed KV Store"
          href="https://github.com/example/kvstore"
          location="Go、Raft、LSM-Tree、gRPC"
          role="项目负责人"
          date="2024.03 – 2024.12"
        >
          <ResumeBullets>
            <ResumeBullet>基于 Raft 共识算法实现强一致的分布式键值存储，支持节点动态扩缩容。</ResumeBullet>
            <ResumeBullet>实现 LSM-Tree 存储引擎，写入吞吐达到 12 万 ops/s。</ResumeBullet>
          </ResumeBullets>
        </ResumeEntry>
        <ResumeEntry
          title="中文医疗问答系统"
          titleSuffix="Chinese Medical QA"
          location="Python、RAG、LLM、FAISS"
          role="核心开发"
          date="2023.09 – 2024.01"
        >
          <ResumeBullets>
            <ResumeBullet>构建基于检索增强生成（RAG）的医疗问答系统，覆盖 30 万条结构化知识。</ResumeBullet>
            <ResumeBullet>在自建测试集上将回答准确率从 71% 提升到 86%。</ResumeBullet>
          </ResumeBullets>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="荣誉奖项">
        <ResumeEntry title="ACM-ICPC 亚洲区域赛银奖" role="ICPC" date="2024.11" />
        <ResumeEntry title="国家奖学金" role="教育部" date="2023.10">
          <ResumeNote plain>授予年级综合排名前 1% 的学生。</ResumeNote>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="专业能力">
        <ResumeGrid>
          <ResumeGridRow label="编程语言">Go、Python、C++、TypeScript、SQL</ResumeGridRow>
          <ResumeGridRow label="框架与工具">PyTorch、gRPC、Docker、Kubernetes、Redis</ResumeGridRow>
          <ResumeGridRow label="研究方向">分布式系统、机器学习、推荐系统</ResumeGridRow>
        </ResumeGrid>
      </ResumeSection>

      <ResumeSection title="语言能力">
        <ResumeInline label="英语" lang="zh">雅思 7.5（听力 8.0）</ResumeInline>
        <ResumeInline label="普通话" lang="zh">母语</ResumeInline>
      </ResumeSection>
    </ResumeDocument>
  );
}

export const demoResume: StudentResume = {
  slug: "demo",
  names: { en: "Lin Zhiyuan", zh: "林知远" },
  descriptions: {
    en: "Backend and machine-learning engineer with experience in distributed systems and recommendation models.",
    zh: "后端与机器学习方向学生简历。",
  },
  pages: { en: DemoEnglish, zh: DemoChinese },
};
