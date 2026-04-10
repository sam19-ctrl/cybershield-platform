import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/ai-analysis";
import Common "../types/common";

module {
  func nextId(cell : List.List<Nat>) : Nat {
    switch (cell.first()) { case (?n) n; case null 0 };
  };

  func bumpId(cell : List.List<Nat>) {
    let current = switch (cell.first()) { case (?n) n; case null 0 };
    cell.put(0, current + 1);
  };

  // Generate realistic mock penetration tester AI analysis
  func mockAnalysis(target : Text) : (Text, [Types.AIVulnerability], Nat, [Text]) {
    let thinking = "Initiating reconnaissance on " # target # "...\n" #
      "→ OSINT gathering: WHOIS, DNS records, certificate transparency logs\n" #
      "→ Port enumeration: detected open ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 8080 (alt-HTTP)\n" #
      "→ Service fingerprinting: Apache 2.4.51, OpenSSH 8.2p1, nginx 1.21\n" #
      "→ Vulnerability correlation: matching CVE database against detected service versions\n" #
      "→ Web application analysis: crawling endpoints, testing injection vectors\n" #
      "→ Authentication testing: checking for default credentials and brute-force exposure\n" #
      "→ Analysis complete. Generating threat assessment report...";

    let vulns : [Types.AIVulnerability] = [
      {
        title = "SQL Injection — Authentication Bypass";
        severity = "Critical";
        description = "The login endpoint /" # target # "/api/auth accepts unsanitized input. Classic ' OR '1'='1 payload bypasses authentication, exposing full database access. CVE-2023-1234 (CVSS 9.8).";
        recommendation = "Implement parameterized queries / prepared statements. Use an ORM with built-in sanitization. Deploy a WAF rule for SQL metacharacters.";
      },
      {
        title = "Exposed SSH Service with Weak Auth";
        severity = "High";
        description = "SSH (port 22) is publicly accessible. OpenSSH 8.2p1 has known vulnerabilities. Password authentication enabled without fail2ban protection — susceptible to automated brute force.";
        recommendation = "Disable password authentication; enforce SSH key-only login. Restrict SSH access to known IPs via firewall. Update to OpenSSH 9.x. Enable fail2ban with aggressive thresholds.";
      },
      {
        title = "Cross-Site Scripting (Reflected XSS)";
        severity = "High";
        description = "The search and error message endpoints reflect user input without encoding. Attackers can craft URLs that execute arbitrary JavaScript in victim browsers, enabling session hijacking and credential theft.";
        recommendation = "Encode all user-supplied output using context-aware escaping (HTML, JS, URL). Implement a strict Content-Security-Policy header. Use DOMPurify for any dynamic HTML rendering.";
      },
      {
        title = "Missing HTTP Security Headers";
        severity = "Medium";
        description = "Target lacks Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy headers. Exposure to clickjacking, MIME sniffing, and downgrade attacks.";
        recommendation = "Add all OWASP recommended security headers. Enable HSTS with includeSubDomains and preload. Set X-Frame-Options: DENY. Configure CSP to restrict script sources.";
      },
      {
        title = "Outdated TLS Configuration";
        severity = "Medium";
        description = "Server supports TLS 1.0 and 1.1 alongside TLS 1.2/1.3. Weak cipher suites detected (RC4, DES, 3DES). Vulnerable to POODLE and BEAST attacks.";
        recommendation = "Disable TLS 1.0 and 1.1. Remove all weak and null cipher suites. Enable only TLS 1.2+ with AEAD ciphers (AES-GCM, ChaCha20-Poly1305). Use ssl_labs A+ configuration.";
      },
      {
        title = "Verbose Error Messages";
        severity = "Low";
        description = "Application returns stack traces, database error messages, and internal paths in HTTP error responses. Reveals technology stack, file paths, and potential injection points to attackers.";
        recommendation = "Configure custom error pages for all HTTP error codes. Suppress stack traces in production. Log errors server-side only. Return generic user-friendly error messages.";
      },
    ];

    let riskScore : Nat = 78;

    let suggestions = [
      "Immediately patch the SQL injection vulnerability — it enables full database compromise",
      "Restrict SSH to VPN/bastion host access only; disable public port 22 exposure",
      "Conduct a full SAST/DAST scan of all web application endpoints before next release",
      "Implement a Web Application Firewall (WAF) in blocking mode with OWASP Core Rule Set",
      "Enable automated vulnerability scanning in CI/CD pipeline to catch regressions",
      "Schedule a full penetration test after remediation to verify fix effectiveness",
      "Review and rotate all API keys and secrets — assume compromise given SQL injection exposure",
    ];

    (thinking, vulns, riskScore, suggestions);
  };

  public func analyzeTarget(
    analyses : List.List<Types.AIAnalysis>,
    nextIdCell : List.List<Nat>,
    target : Text,
    _context : Text,
  ) : Types.AIAnalysisResult {
    let id = nextId(nextIdCell);
    bumpId(nextIdCell);

    let (thinking, vulns, riskScore, suggestions) = mockAnalysis(target);

    let analysis : Types.AIAnalysis = {
      id;
      target;
      thinking;
      vulnerabilities = vulns;
      riskScore;
      suggestions;
      completedAt = Time.now();
    };
    analyses.add(analysis);
    #ok(analysis);
  };

  public func getAnalysis(
    analyses : List.List<Types.AIAnalysis>,
    id : Common.AnalysisId,
  ) : ?Types.AIAnalysis {
    analyses.find(func(a) { a.id == id });
  };

  public func listAnalyses(
    analyses : List.List<Types.AIAnalysis>
  ) : [Types.AIAnalysis] {
    analyses.toArray();
  };
};
