resource "aws_ses_domain_identity" "ses_identity" {
  domain = "monorepo-toy-project.com"
}

resource "aws_ses_email_identity" "email_identity" {
  email = "municfara@gmail.com"
}