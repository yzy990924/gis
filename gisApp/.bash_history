# GNU Libtool is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with GNU Libtool; see the file COPYING.  If not, a copy
# can be downloaded from http://www.gnu.org/licenses/gpl.html,
# or obtained by writing to the Free Software Foundation, Inc.,
# 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
# Usage: $progname [OPTION]... [MODE-ARG]...
#
# Provide generalized library-building support services.
#
#       --config             show all configuration variables
#       --debug              enable verbose shell tracing
#   -n, --dry-run            display commands without modifying any files
#       --features           display basic configuration information and exit
#       --mode=MODE          use operation mode MODE
#       --preserve-dup-deps  don't remove duplicate dependency libraries
#       --quiet, --silent    don't print informational messages
#       --no-quiet, --no-silent
#                            print informational messages (default)
#       --no-warn            don't display warning messages
#       --tag=TAG            use configuration variables from tag TAG
#   -v, --verbose            print more informational messages than default
#       --no-verbose         don't print the extra informational messages
#       --version            print version information
#   -h, --help, --help-all   print short, long, or detailed help message
#
# MODE must be one of the following:
#
#         clean              remove files from the build directory
#         compile            compile a source file into a libtool object
#         execute            automatically set library path, then run a program
#         finish             complete the installation of libtool libraries
#         install            install libraries or executables
#         link               create a library or an executable
#         uninstall          remove libraries from an installed directory
#
# MODE-ARGS vary depending on the MODE.  When passed as first option,
# `--mode=MODE' may be abbreviated as `MODE' or a unique abbreviation of that.
# Try `$progname --help --mode=MODE' for a more detailed description of MODE.
#
# When reporting a bug, please describe a test case to reproduce it and
# include the following information:
#
#         host-triplet:	$host
#         shell:		$SHELL
#         compiler:		$LTCC
#         compiler flags:		$LTCFLAGS
#         linker:		$LD (gnu? $with_gnu_ld)
#         $progname:	(GNU libtool) 2.4.2
#         automake:	$automake_version
#         autoconf:	$autoconf_version
#
# Report bugs to <bug-libtool@gnu.org>.
# GNU libtool home page: <http://www.gnu.org/software/libtool/>.
# General help using GNU software: <http://www.gnu.org/gethelp/>.
PROGRAM=libtool
PACKAGE=libtool
VERSION=2.4.2
TIMESTAMP=""
package_revision=1.3337
# Be Bourne compatible
if test -n "${ZSH_VERSION+set}" && (emulate sh) >/dev/null 2>&1; then   emulate sh;   NULLCMD=:   alias -g '${1+"$@"}'='"$@"';   setopt NO_GLOB_SUBST; else   case `(set -o) 2>/dev/null` in *posix*) set -o posix;; esac; fi
BIN_SH=xpg4; export BIN_SH # for Tru64
DUALCASE=1; export DUALCASE # for MKS sh
# A function that is used when there is no print builtin or printf.
func_fallback_echo () {
  eval 'cat <<_LTECHO_EOF
$1
_LTECHO_EOF'; }
# NLS nuisances: We save the old values to restore during execute mode.
lt_user_locale=
lt_safe_locale=
for lt_var in LANG LANGUAGE LC_ALL LC_CTYPE LC_COLLATE LC_MESSAGES; do   eval "if test \"\${$lt_var+set}\" = set; then
          save_$lt_var=\$$lt_var
          $lt_var=C
	  export $lt_var
	  lt_user_locale=\"$lt_var=\\\$save_\$lt_var; \$lt_user_locale\"
	  lt_safe_locale=\"$lt_var=C; \$lt_safe_locale\"
	fi"; done
LC_ALL=C
LANGUAGE=C
export LANGUAGE LC_ALL
$lt_unset CDPATH
# Work around backward compatibility issue on IRIX 6.5. On IRIX 6.4+, sh
# is ksh but when the shell is invoked as "sh" and the current value of
# the _XPG environment variable is not equal to 1 (one), the special
# positional parameter $0, within a function call, is the name of the
# function.
progpath="$0"
: ${CP="cp -f"}
test "${ECHO+set}" = set || ECHO=${as_echo-'printf %s\n'}
: ${MAKE="make"}
: ${MKDIR="mkdir"}
: ${MV="mv -f"}
: ${RM="rm -f"}
: ${SHELL="${CONFIG_SHELL-/bin/sh}"}
: ${Xsed="$SED -e 1s/^X//"}
# Global variables:
EXIT_SUCCESS=0
EXIT_FAILURE=1
EXIT_MISMATCH=63  # $? = 63 is used to indicate version mismatch to missing.
EXIT_SKIP=77	  # $? = 77 is used to indicate a skipped test to automake.
exit_status=$EXIT_SUCCESS
# Make sure IFS has a sensible default
lt_nl='
'
IFS=" 	$lt_nl"
dirname="s,/[^/]*$,,"
basename="s,^.*/,,"
# func_dirname file append nondir_replacement
# Compute the dirname of FILE.  If nonempty, add APPEND to the result,
# otherwise set result to NONDIR_REPLACEMENT.
func_dirname () {     func_dirname_result=`$ECHO "${1}" | $SED "$dirname"`;     if test "X$func_dirname_result" = "X${1}"; then       func_dirname_result="${3}";     else       func_dirname_result="$func_dirname_result${2}";     fi; } # func_dirname may be replaced by extended shell implementation
# func_basename file
func_basename () {     func_basename_result=`$ECHO "${1}" | $SED "$basename"`; } # func_basename may be replaced by extended shell implementation
# func_dirname_and_basename file append nondir_replacement
# perform func_basename and func_dirname in a single function
# call:
#   dirname:  Compute the dirname of FILE.  If nonempty,
#             add APPEND to the result, otherwise set result
#             to NONDIR_REPLACEMENT.
#             value returned in "$func_dirname_result"
#   basename: Compute filename of FILE.
#             value retuned in "$func_basename_result"
# Implementation must be kept synchronized with func_dirname
# and func_basename. For efficiency, we do not delegate to
# those functions but instead duplicate the functionality here.
func_dirname_and_basename () {     func_dirname_result=`$ECHO "${1}" | $SED -e "$dirname"`;     if test "X$func_dirname_result" = "X${1}"; then       func_dirname_result="${3}";     else       func_dirname_result="$func_dirname_result${2}";     fi;     func_basename_result=`$ECHO "${1}" | $SED -e "$basename"`; } # func_dirname_and_basename may be replaced by extended shell implementation
# func_stripname prefix suffix name
# strip PREFIX and SUFFIX off of NAME.
# PREFIX and SUFFIX must not contain globbing or regex special
# characters, hashes, percent signs, but SUFFIX may contain a leading
# dot (in which case that matches only a dot).
# func_strip_suffix prefix name
func_stripname () {     case ${2} in       .*) func_stripname_result=`$ECHO "${3}" | $SED "s%^${1}%%; s%\\\\${2}\$%%"`;;       *)  func_stripname_result=`$ECHO "${3}" | $SED "s%^${1}%%; s%${2}\$%%"`;;     esac; } # func_stripname may be replaced by extended shell implementation
# These SED scripts presuppose an absolute path with a trailing slash.
pathcar='s,^/\([^/]*\).*$,\1,'
pathcdr='s,^/[^/]*,,'
removedotparts=':dotsl
		s@/\./@/@g
		t dotsl
		s,/\.$,/,'
collapseslashes='s@/\{1,\}@/@g'
finalslash='s,/*$,/,'
# func_normal_abspath PATH
# Remove doubled-up and trailing slashes, "." path components,
# and cancel out any ".." path components in PATH after making
# it an absolute path.
#             value returned in "$func_normal_abspath_result"
func_normal_abspath () {   func_normal_abspath_result=;   func_normal_abspath_tpath=$1;   func_normal_abspath_altnamespace=;   case $func_normal_abspath_tpath in     "")       func_stripname '' '/' "`pwd`";       func_normal_abspath_result=$func_stripname_result;       return;     ;;     ///*)     ;;     //*)       func_normal_abspath_altnamespace=/;     ;;     /*)     ;;     *)       func_normal_abspath_tpath=`pwd`/$func_normal_abspath_tpath;     ;;   esac   func_normal_abspath_tpath=`$ECHO "$func_normal_abspath_tpath" | $SED \
        -e "$removedotparts" -e "$collapseslashes" -e "$finalslash"`;   while :; do     if test "$func_normal_abspath_tpath" = / ; then       if test -z "$func_normal_abspath_result" ; then         func_normal_abspath_result=/;       fi;       break;     fi;     func_normal_abspath_tcomponent=`$ECHO "$func_normal_abspath_tpath" | $SED \
        -e "$pathcar"`;     func_normal_abspath_tpath=`$ECHO "$func_normal_abspath_tpath" | $SED \
        -e "$pathcdr"`     case $func_normal_abspath_tcomponent in       "")       ;;       ..)         func_dirname "$func_normal_abspath_result";         func_normal_abspath_result=$func_dirname_result;       ;;       *)         func_normal_abspath_result=$func_normal_abspath_result/$func_normal_abspath_tcomponent;       ;;     esac;   done   func_normal_abspath_result=$func_normal_abspath_altnamespace$func_normal_abspath_result; }
# func_relative_path SRCDIR DSTDIR
# generates a relative path from SRCDIR to DSTDIR, with a trailing
# slash if non-empty, suitable for immediately appending a filename
# without needing to append a separator.
#             value returned in "$func_relative_path_result"
func_relative_path () {   func_relative_path_result=;   func_normal_abspath "$1";   func_relative_path_tlibdir=$func_normal_abspath_result;   func_normal_abspath "$2";   func_relative_path_tbindir=$func_normal_abspath_result;    while :; do     case $func_relative_path_tbindir in       $func_relative_path_tlibdir)         func_relative_path_tcancelled=;         break;         ;;       $func_relative_path_tlibdir*)         func_stripname "$func_relative_path_tlibdir" '' "$func_relative_path_tbindir";         func_relative_path_tcancelled=$func_stripname_result;         if test -z "$func_relative_path_result"; then           func_relative_path_result=.;         fi;         break;         ;;       *)         func_dirname $func_relative_path_tlibdir;         func_relative_path_tlibdir=${func_dirname_result};         if test "x$func_relative_path_tlibdir" = x ; then           func_relative_path_result=../$func_relative_path_result;           func_relative_path_tcancelled=$func_relative_path_tbindir;           break;         fi;         func_relative_path_result=../$func_relative_path_result;         ;;     esac;   done;    func_stripname '' '/' "$func_relative_path_result";   func_relative_path_result=$func_stripname_result;   func_stripname '/' '/' "$func_relative_path_tcancelled";   if test "x$func_stripname_result" != x ; then     func_relative_path_result=${func_relative_path_result}/${func_stripname_result};   fi;    if test ! -z "$func_relative_path_result"; then     func_stripname './' '' "$func_relative_path_result/";     func_relative_path_result=$func_stripname_result;   fi; }
# The name of this program:
func_dirname_and_basename "$progpath"
progname=$func_basename_result
# Make sure we have an absolute path for reexecution:
case $progpath in   [\\/]*|[A-Za-z]:\\*) ;;   *[\\/]*)      progdir=$func_dirname_result;      progdir=`cd "$progdir" && pwd`;      progpath="$progdir/$progname";      ;;   *)      save_IFS="$IFS";      IFS=${PATH_SEPARATOR-:};      for progdir in $PATH; do        IFS="$save_IFS";        test -x "$progdir/$progname" && break;      done;      IFS="$save_IFS";      test -n "$progdir" || progdir=`pwd`;      progpath="$progdir/$progname";      ;; esac
# Sed substitution that helps us do robust quoting.  It backslashifies
# metacharacters that are still active within double-quoted strings.
Xsed="${SED}"' -e 1s/^X//'
sed_quote_subst='s/\([`"$\\]\)/\\\1/g'
# Same as above, but do not quote variable references.
double_quote_subst='s/\(["`\\]\)/\\\1/g'
# Sed substitution that turns a string into a regex matching for the
# string literally.
sed_make_literal_regex='s,[].[^$\\*\/],\\&,g'
# Sed substitution that converts a w32 file name or path
# which contains forward slashes, into one that contains
# (escaped) backslashes.  A very naive implementation.
lt_sed_naive_backslashify='s|\\\\*|\\|g;s|/|\\|g;s|\\|\\\\|g'
# Re-`\' parameter expansions in output of double_quote_subst that were
# `\'-ed in input to the same.  If an odd number of `\' preceded a '$'
# in input to double_quote_subst, that '$' was protected from expansion.
# Since each input `\' is now two `\'s, look for any number of runs of
# four `\'s followed by two `\'s and then a '$'.  `\' that '$'.
bs='\\'
bs2='\\\\'
bs4='\\\\\\\\'
dollar='\$'
sed_double_backslash="\
  s/$bs4/&\\
/g
  s/^$bs2$dollar/$bs&/
  s/\\([^$bs]\\)$bs2$dollar/\\1$bs2$bs$dollar/g
  s/\n//g"
# Standard options:
opt_dry_run=false
opt_help=false
opt_quiet=false
opt_verbose=false
opt_warning=:
# func_echo arg...
# Echo program name prefixed message, along with the current mode
# name if it has been set yet.
func_echo () {     $ECHO "$progname: ${opt_mode+$opt_mode: }$*"; }
# func_verbose arg...
# Echo program name prefixed message in verbose mode only.
func_verbose () {     $opt_verbose && func_echo ${1+"$@"};      :; }
# func_echo_all arg...
# Invoke $ECHO with all args, space-separated.
func_echo_all () {     $ECHO "$*"; }
# func_error arg...
# Echo program name prefixed message to standard error.
func_error () {     $ECHO "$progname: ${opt_mode+$opt_mode: }"${1+"$@"} 1>&2; }
# func_warning arg...
# Echo program name prefixed warning message to standard error.
func_warning () {     $opt_warning && $ECHO "$progname: ${opt_mode+$opt_mode: }warning: "${1+"$@"} 1>&2;      :; }
# func_fatal_error arg...
# Echo program name prefixed message to standard error, and exit.
func_fatal_error () {     func_error ${1+"$@"};     exit $EXIT_FAILURE; }
# func_fatal_help arg...
# Echo program name prefixed message to standard error, followed by
# a help hint, and exit.
func_fatal_help () {     func_error ${1+"$@"};     func_fatal_error "$help"; }
help="Try \`$progname --help' for more information."  ## default
# func_grep expression filename
# Check whether EXPRESSION matches any line of FILENAME, without output.
func_grep () {     $GREP "$1" "$2" >/dev/null 2>&1; }
# func_mkdir_p directory-path
# Make sure the entire path to DIRECTORY-PATH is available.
func_mkdir_p () {     my_directory_path="$1";     my_dir_list=;      if test -n "$my_directory_path" && test "$opt_dry_run" != ":"; then       case $my_directory_path in         -*) my_directory_path="./$my_directory_path" ;;       esac;        while test ! -d "$my_directory_path"; do         my_dir_list="$my_directory_path:$my_dir_list";          case $my_directory_path in */*) ;; *) break ;; esac;          my_directory_path=`$ECHO "$my_directory_path" | $SED -e "$dirname"`;       done;       my_dir_list=`$ECHO "$my_dir_list" | $SED 's,:*$,,'`;        save_mkdir_p_IFS="$IFS"; IFS=':';       for my_dir in $my_dir_list; do 	IFS="$save_mkdir_p_IFS"         $MKDIR "$my_dir" 2>/dev/null || :;       done;       IFS="$save_mkdir_p_IFS";        test -d "$my_directory_path" ||         func_fatal_error "Failed to create \`$1'";     fi; }
# func_mktempdir [string]
# Make a temporary directory that won't clash with other running
# libtool processes, and avoids race conditions if possible.  If
# given, STRING is the basename for that directory.
func_mktempdir () {     my_template="${TMPDIR-/tmp}/${1-$progname}";      if test "$opt_dry_run" = ":"; then       my_tmpdir="${my_template}-$$";     else       my_tmpdir=`mktemp -d "${my_template}-XXXXXXXX" 2>/dev/null`;        if test ! -d "$my_tmpdir"; then         my_tmpdir="${my_template}-${RANDOM-0}$$";          save_mktempdir_umask=`umask`;         umask 0077;         $MKDIR "$my_tmpdir";         umask $save_mktempdir_umask;       fi;        test -d "$my_tmpdir" ||         func_fatal_error "cannot create temporary directory \`$my_tmpdir'";     fi;      $ECHO "$my_tmpdir"; }
# func_quote_for_eval arg
# Aesthetically quote ARG to be evaled later.
# This function returns two values: FUNC_QUOTE_FOR_EVAL_RESULT
# is double-quoted, suitable for a subsequent eval, whereas
# FUNC_QUOTE_FOR_EVAL_UNQUOTED_RESULT has merely all characters
# which are still active within double quotes backslashified.
func_quote_for_eval () {     case $1 in       *[\\\`\"\$]*) 	func_quote_for_eval_unquoted_result=`$ECHO "$1" | $SED "$sed_quote_subst"` ;;       *)         func_quote_for_eval_unquoted_result="$1" ;;     esac;      case $func_quote_for_eval_unquoted_result in       *[\[\~\#\^\&\*\(\)\{\}\|\;\<\>\?\'\ \	]*|*]*|"")         func_quote_for_eval_result="\"$func_quote_for_eval_unquoted_result\"";         ;;       *)         func_quote_for_eval_result="$func_quote_for_eval_unquoted_result";     esac; }
# func_quote_for_expand arg
# Aesthetically quote ARG to be evaled later; same as above,
# but do not quote variable references.
func_quote_for_expand () {     case $1 in       *[\\\`\"]*) 	my_arg=`$ECHO "$1" | $SED \
	    -e "$double_quote_subst" -e "$sed_double_backslash"` ;;       *)         my_arg="$1" ;;     esac;      case $my_arg in       *[\[\~\#\^\&\*\(\)\{\}\|\;\<\>\?\'\ \	]*|*]*|"")         my_arg="\"$my_arg\"";         ;;     esac;      func_quote_for_expand_result="$my_arg"; }
# func_show_eval cmd [fail_exp]
# Unless opt_silent is true, then output CMD.  Then, if opt_dryrun is
# not true, evaluate CMD.  If the evaluation of CMD fails, and FAIL_EXP
# is given, then evaluate it.
func_show_eval () {     my_cmd="$1";     my_fail_exp="${2-:}";      ${opt_silent-false} || {       func_quote_for_expand "$my_cmd";       eval "func_echo $func_quote_for_expand_result";     };      if ${opt_dry_run-false}; then :; else       eval "$my_cmd";       my_status=$?;       if test "$my_status" -eq 0; then :; else 	eval "(exit $my_status); $my_fail_exp";       fi;     fi; }
# func_show_eval_locale cmd [fail_exp]
# Unless opt_silent is true, then output CMD.  Then, if opt_dryrun is
# not true, evaluate CMD.  If the evaluation of CMD fails, and FAIL_EXP
# is given, then evaluate it.  Use the saved locale for evaluation.
func_show_eval_locale () {     my_cmd="$1";     my_fail_exp="${2-:}";      ${opt_silent-false} || {       func_quote_for_expand "$my_cmd";       eval "func_echo $func_quote_for_expand_result";     };      if ${opt_dry_run-false}; then :; else       eval "$lt_user_locale
	    $my_cmd";       my_status=$?;       eval "$lt_safe_locale";       if test "$my_status" -eq 0; then :; else 	eval "(exit $my_status); $my_fail_exp";       fi;     fi; }
# func_tr_sh
# Turn $1 into a string suitable for a shell variable name.
# Result is stored in $func_tr_sh_result.  All characters
# not in the set a-zA-Z0-9_ are replaced with '_'. Further,
# if $1 begins with a digit, a '_' is prepended as well.
func_tr_sh () {   case $1 in   [0-9]* | *[!a-zA-Z0-9_]*)     func_tr_sh_result=`$ECHO "$1" | $SED 's/^\([0-9]\)/_\1/; s/[^a-zA-Z0-9_]/_/g'`;     ;;   * )     func_tr_sh_result=$1;     ;;   esac; }
# func_version
# Echo version message to standard output and exit.
func_version () {     $opt_debug;      $SED -n '/(C)/!b go
	:more
	/\./!{
	  N
	  s/\n# / /
	  b more
	}
	:go
	/^# '$PROGRAM' (GNU /,/# warranty; / {
        s/^# //
	s/^# *$//
        s/\((C)\)[ 0-9,-]*\( [1-9][0-9]*\)/\1\2/
        p
     }' < "$progpath";      exit $?; }
# func_usage
# Echo short help message to standard output and exit.
func_usage () {     $opt_debug;      $SED -n '/^# Usage:/,/^#  *.*--help/ {
        s/^# //
	s/^# *$//
	s/\$progname/'$progname'/
	p
    }' < "$progpath";     echo;     $ECHO "run \`$progname --help | more' for full usage";     exit $?; }
# func_help [NOEXIT]
# Echo long help message to standard output and exit,
# unless 'noexit' is passed as argument.
func_help () {     $opt_debug;      $SED -n '/^# Usage:/,/# Report bugs to/ {
	:print
        s/^# //
	s/^# *$//
	s*\$progname*'$progname'*
	s*\$host*'"$host"'*
	s*\$SHELL*'"$SHELL"'*
	s*\$LTCC*'"$LTCC"'*
	s*\$LTCFLAGS*'"$LTCFLAGS"'*
	s*\$LD*'"$LD"'*
	s/\$with_gnu_ld/'"$with_gnu_ld"'/
	s/\$automake_version/'"`(${AUTOMAKE-automake} --version) 2>/dev/null |$SED 1q`"'/
	s/\$autoconf_version/'"`(${AUTOCONF-autoconf} --version) 2>/dev/null |$SED 1q`"'/
	p
	d
     }
     /^# .* home page:/b print
     /^# General help using/b print
     ' < "$progpath";     ret=$?;     if test -z "$1"; then       exit $ret;     fi; }
# func_missing_arg argname
# Echo program name prefixed message to standard error and set global
# exit_cmd.
func_missing_arg () {     $opt_debug;      func_error "missing argument for $1.";     exit_cmd=exit; }
# func_split_short_opt shortopt
# Set func_split_short_opt_name and func_split_short_opt_arg shell
# variables after splitting SHORTOPT after the 2nd character.
func_split_short_opt () {     my_sed_short_opt='1s/^\(..\).*$/\1/;q';     my_sed_short_rest='1s/^..\(.*\)$/\1/;q';      func_split_short_opt_name=`$ECHO "$1" | $SED "$my_sed_short_opt"`;     func_split_short_opt_arg=`$ECHO "$1" | $SED "$my_sed_short_rest"`; } # func_split_short_opt may be replaced by extended shell implementation
# func_split_long_opt longopt
# Set func_split_long_opt_name and func_split_long_opt_arg shell
# variables after splitting LONGOPT at the `=' sign.
func_split_long_opt () {     my_sed_long_opt='1s/^\(--[^=]*\)=.*/\1/;q';     my_sed_long_arg='1s/^--[^=]*=//';      func_split_long_opt_name=`$ECHO "$1" | $SED "$my_sed_long_opt"`;     func_split_long_opt_arg=`$ECHO "$1" | $SED "$my_sed_long_arg"`; } # func_split_long_opt may be replaced by extended shell implementation
exit_cmd=:
magic="%%%MAGIC variable%%%"
magic_exe="%%%MAGIC EXE variable%%%"
# Global variables.
nonopt=
preserve_args=
lo2o="s/\\.lo\$/.${objext}/"
o2lo="s/\\.${objext}\$/.lo/"
extracted_archives=
extracted_serial=0
# If this variable is set in any of the actions, the command in it
# will be execed at the end.  This prevents here-documents from being
# left over by shells.
exec_cmd=
# func_append var value
# Append VALUE to the end of shell variable VAR.
func_append () {     eval "${1}=\$${1}\${2}"; } # func_append may be replaced by extended shell implementation
# func_append_quoted var value
# Quote VALUE and append to the end of shell variable VAR, separated
# by a space.
func_append_quoted () {     func_quote_for_eval "${2}";     eval "${1}=\$${1}\\ \$func_quote_for_eval_result"; } # func_append_quoted may be replaced by extended shell implementation
# func_arith arithmetic-term...
func_arith () {     func_arith_result=`expr "${@}"`; } # func_arith may be replaced by extended shell implementation
# func_len string
# STRING may not start with a hyphen.
func_len () {     func_len_result=`expr "${1}" : ".*" 2>/dev/null || echo $max_cmd_len`; } # func_len may be replaced by extended shell implementation
# func_lo2o object
func_lo2o () {     func_lo2o_result=`$ECHO "${1}" | $SED "$lo2o"`; } # func_lo2o may be replaced by extended shell implementation
# func_xform libobj-or-source
func_xform () {     func_xform_result=`$ECHO "${1}" | $SED 's/\.[^.]*$/.lo/'`; } # func_xform may be replaced by extended shell implementation
# func_fatal_configuration arg...
# Echo program name prefixed message to standard error, followed by
# a configuration failure hint, and exit.
func_fatal_configuration () {     func_error ${1+"$@"};     func_error "See the $PACKAGE documentation for more information.";     func_fatal_error "Fatal configuration error."; }
# func_config
# Display the configuration for all the tags in this script.
func_config () {     re_begincf='^# ### BEGIN LIBTOOL';     re_endcf='^# ### END LIBTOOL';      $SED "1,/$re_begincf CONFIG/d;/$re_endcf CONFIG/,\$d" < "$progpath";      for tagname in $taglist; do       $SED -n "/$re_begincf TAG CONFIG: $tagname\$/,/$re_endcf TAG CONFIG: $tagname\$/p" < "$progpath";     done;      exit $?; }
# func_features
# Display the features supported by this script.
func_features () {     echo "host: $host";     if test "$build_libtool_libs" = yes; then       echo "enable shared libraries";     else       echo "disable shared libraries";     fi;     if test "$build_old_libs" = yes; then       echo "enable static libraries";     else       echo "disable static libraries";     fi;      exit $?; }
# func_enable_tag tagname
# Verify that TAGNAME is valid, and either flag an error and exit, or
# enable the TAGNAME tag.  We also add TAGNAME to the global $taglist
# variable here.
func_enable_tag () {   tagname="$1";    re_begincf="^# ### BEGIN LIBTOOL TAG CONFIG: $tagname\$";   re_endcf="^# ### END LIBTOOL TAG CONFIG: $tagname\$";   sed_extractcf="/$re_begincf/,/$re_endcf/p";    case $tagname in     *[!-_A-Za-z0-9,/]*)       func_fatal_error "invalid tag name: $tagname";       ;;   esac;    case $tagname in     CC) ;;     *)       if $GREP "$re_begincf" "$progpath" >/dev/null 2>&1; then 	taglist="$taglist $tagname";  	extractedcf=`$SED -n -e "$sed_extractcf" < "$progpath"`; 	eval "$extractedcf";       else 	func_error "ignoring unknown tag $tagname";       fi;       ;;   esac; }
# func_check_version_match
# Ensure that we are using m4 macros, and libtool script from the same
# release of libtool.
func_check_version_match () {   if test "$package_revision" != "$macro_revision"; then     if test "$VERSION" != "$macro_version"; then       if test -z "$macro_version"; then
        cat >&2 <<_LT_EOF
$progname: Version mismatch error.  This is $PACKAGE $VERSION, but the
$progname: definition of this LT_INIT comes from an older release.
$progname: You should recreate aclocal.m4 with macros from $PACKAGE $VERSION
$progname: and run autoconf again.
_LT_EOF
       else
        cat >&2 <<_LT_EOF
$progname: Version mismatch error.  This is $PACKAGE $VERSION, but the
$progname: definition of this LT_INIT comes from $PACKAGE $macro_version.
$progname: You should recreate aclocal.m4 with macros from $PACKAGE $VERSION
$progname: and run autoconf again.
_LT_EOF
       fi;     else
      cat >&2 <<_LT_EOF
$progname: Version mismatch error.  This is $PACKAGE $VERSION, revision $package_revision,
$progname: but the definition of this LT_INIT comes from revision $macro_revision.
$progname: You should recreate aclocal.m4 with macros from revision $package_revision
$progname: of $PACKAGE $VERSION and run autoconf again.
_LT_EOF
     fi;      exit $EXIT_MISMATCH;   fi; }
# Shorthand for --mode=foo, only valid as the first argument
case $1 in clean|clea|cle|cl)   shift; set dummy --mode clean ${1+"$@"}; shift;   ;; compile|compil|compi|comp|com|co|c)   shift; set dummy --mode compile ${1+"$@"}; shift;   ;; execute|execut|execu|exec|exe|ex|e)   shift; set dummy --mode execute ${1+"$@"}; shift;   ;; finish|finis|fini|fin|fi|f)   shift; set dummy --mode finish ${1+"$@"}; shift;   ;; install|instal|insta|inst|ins|in|i)   shift; set dummy --mode install ${1+"$@"}; shift;   ;; link|lin|li|l)   shift; set dummy --mode link ${1+"$@"}; shift;   ;; uninstall|uninstal|uninsta|uninst|unins|unin|uni|un|u)   shift; set dummy --mode uninstall ${1+"$@"}; shift;   ;; esac
# Option defaults:
opt_debug=:
opt_dry_run=false
opt_config=false
opt_preserve_dup_deps=false
opt_features=false
opt_finish=false
opt_help=false
opt_help_all=false
opt_silent=:
opt_warning=:
opt_verbose=:
opt_silent=false
opt_verbose=false
# Parse options once, thoroughly.  This comes as soon as possible in the
# script to make things like `--version' happen as quickly as we can.
{   while test $# -gt 0; do     opt="$1";     shift;     case $opt in       --debug|-x)	opt_debug='set -x'; 			func_echo "enabling shell trace mode"; 			$opt_debug; 			;;       --dry-run|--dryrun|-n) 			opt_dry_run=:; 			;;       --config) 			opt_config=:; func_config; 			;;       --dlopen|-dlopen) 			optarg="$1"; 			opt_dlopen="${opt_dlopen+$opt_dlopen
}$optarg"; 			shift; 			;;       --preserve-dup-deps) 			opt_preserve_dup_deps=:; 			;;       --features) 			opt_features=:; func_features; 			;;       --finish) 			opt_finish=:; set dummy --mode finish ${1+"$@"}; shift; 			;;       --help) 			opt_help=:; 			;;       --help-all) 			opt_help_all=:; opt_help=': help-all'; 			;;       --mode) 			test $# = 0 && func_missing_arg $opt && break; 			optarg="$1"; 			opt_mode="$optarg"; case $optarg in   clean|compile|execute|finish|install|link|relink|uninstall) ;;   *) func_error "invalid argument for $opt";      exit_cmd=exit;      break;      ;; esac; 			shift; 			;;       --no-silent|--no-quiet); 			opt_silent=false; func_append preserve_args " $opt"; 			;;       --no-warning|--no-warn); 			opt_warning=false; func_append preserve_args " $opt"; 			;;       --no-verbose); 			opt_verbose=false; func_append preserve_args " $opt"; 			;;       --silent|--quiet); 			opt_silent=:; func_append preserve_args " $opt";         opt_verbose=false; 			;;       --verbose|-v); 			opt_verbose=:; func_append preserve_args " $opt"; opt_silent=false; 			;;       --tag); 			test $# = 0 && func_missing_arg $opt && break; 			optarg="$1"; 			opt_tag="$optarg"; func_append preserve_args " $opt $optarg"; func_enable_tag "$optarg"; 			shift; 			;;       -\?|-h)		func_usage				;;       --help)		func_help				;;       --version)	func_version				;;       --*=*); 			func_split_long_opt "$opt"; 			set dummy "$func_split_long_opt_name" "$func_split_long_opt_arg" ${1+"$@"}; 			shift; 			;;       -\?*|-h*|-n*|-v*); 			func_split_short_opt "$opt"; 			set dummy "$func_split_short_opt_name" "-$func_split_short_opt_arg" ${1+"$@"}; 			shift; 			;;       --)		break					;;       -*)		func_fatal_help "unrecognized option \`$opt'" ;;       *)		set dummy "$opt" ${1+"$@"};	shift; break  ;;     esac;   done;    if test "$#" -gt 0; then     nonopt="$opt";     shift;   fi;    test "$opt_debug" = : || func_append preserve_args " --debug";    case $host in     *cygwin* | *mingw* | *pw32* | *cegcc*)       opt_duplicate_compiler_generated_deps=:;       ;;     *)       opt_duplicate_compiler_generated_deps=$opt_preserve_dup_deps;       ;;   esac;    $opt_help || {     func_check_version_match;      if test "$build_libtool_libs" != yes && test "$build_old_libs" != yes; then       func_fatal_configuration "not configured to build any kind of library";     fi;      eval std_shrext=\"$shrext_cmds\";      if test -n "$opt_dlopen" && test "$opt_mode" != execute; then       func_error "unrecognized option \`-dlopen'";       $ECHO "$help" 1>&2;       exit $EXIT_FAILURE;     fi;      generic_help="$help";     help="Try \`$progname --help --mode=$opt_mode' for more information.";   };    $exit_cmd $EXIT_FAILURE; }
#!/bin/sh
set -e
# This should be set to wherever you extract the GSHHG data to.
gshhs_dir=./gshhg/
area=10000000000000000000000000000000
gmt gshhg $gshhs_dir/gshhs_c.b > gshhs_c.txt
pip install scikit_image-0.14.3-cp37-cp37m-win32.whl
git clone git@github.com:Hchyeria/wechat-miniprogram-more.git
mkdir triangle counting
cd triangle counting
pwd
git init
pwd
cd triangle counting
pwd
cd TC
pwd
git init
cd TriangleCounting
git init
git remote add origin git@github.com:yzy990924/TriangleCounting.git
git push -u origin master
git add .
git commit -m"part 1"
git push -u origin master
git add .
git commit -m"add big and small resolvent"
git push
cd desktop
proc E1.pc
gcc -fexec-charset=gbk E1.c C:\app\yzy990924\product\12.2.0\dbhome_1\bin\oci.dll -I C:\app\yzy990924\product\12.2.0\dbhome_1\precomp\public -o E1
git add .
git commit -m'first'
git remote git@github.com:yzy990924/gis.git
git remote add origin git@github.com:yzy990924/gis.git
git push
git push -u origi master
git push -u origin master
git pull
git push origin master
git push --help
git push
git push --set-upstream origin master
git push --set-upstream origin master
git push -u origin matser -f
git push 
git push -u origin master
git pull
git status
git add
git add .
git commit -m"hh"
git push
git push --set-upstream origin master
git pull origin master
git pus
git push
git push -u origin master
git push --set-upstream origin master
git branch
git remote
git remote add origin git@github.com:yzy990924/gis.git
git add .
git commit -m"h"
npm install
git commit -m"h"
git studus
git status
git add
git add .
git status
git  commit -m"h"
git push\
git clean -f
git status
git clean -nxfdf
git clean -nxfd
git clean -fd #
git commit -m"h"
git push -u origin master
git pull origin master
git pull origin master --allow-unrelated-histories
git branch
git push
git push --set-upstream origin master
git push -u origin master
